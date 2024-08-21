#pragma once

#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/router.h>
#include "./preventivo_management.h"
#include "../../utils.h"

namespace rest_server
{
    using namespace Pistache;

    class preventivi_server
    {
        friend class server;

    private:
        void _setup_routes(Rest::Router &router)
        {
            Rest::Routes::Get(router, "/api/preventivi", Rest::Routes::bind(&preventivi_server::_api_get_preventivi, this));
            Rest::Routes::Post(router, "/api/preventivi", Rest::Routes::bind(&preventivi_server::_api_post_preventivi, this));
        }

        void _api_get_preventivi(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string> user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, "");
            }

            if (user_data[1] != "segreteria" || user_data[1] != "impiegato")
                response.send(Http::Code::Unauthorized, "");

            cauto::preventivo_management database;
            response.send(Http::Code::Ok, database.get_all_as_json());
        }

        void _api_post_preventivi(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string> user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, "");
            }

            json body;
            if (!kernel::valid_body(request, body))
                response.send(Http::Code::Bad_Request, "");

            cauto::preventivo_management database;
            database.get_all();

            cauto::preventivo newPreventivo;
            try
            {
                std::time_t tempo = std::mktime(&std::time(nullptr));
                newPreventivo.id = static_cast<int>(tempo);
                newPreventivo.macchina_marca = body["macchina_marca"].get<std::string>();
                newPreventivo.macchina_marca = body["macchina_modello"].get<std::string>();
                for (const auto &item : body.at("optionals"))
                {
                    cauto::optional opt;
                    opt.fromJson(item);
                    newPreventivo.optionals.push_back(opt);
                }
                newPreventivo.usato = newPreventivo.usato.fromJson(body.at("usato"));
                newPreventivo.utente = user_data[0];
                newPreventivo.sconto = rand() % 30;
                newPreventivo.prezzo_finale = database.calcolaPrezzoFinale(body["macchina_marca"].get<std::string>(), body["macchina_modello"].get<std::string>(), newPreventivo.optionals, newPreventivo.sconto);
                if (newPreventivo.prezzo_finale == 0)
                    response.send(Http::Code::Expectation_Failed, "");
                newPreventivo.data_creazione = kernel::add_days("", 0);
                newPreventivo.luogo_ritiro = newPreventivo.luogo_ritiro.fromJson(body.at("luogo_ritiro"));
                newPreventivo.data_scadenza = kernel::add_days(newPreventivo.data_creazione, 20);
                newPreventivo.acconto = body["acconto"].get<double>();
                newPreventivo.data_consegna = database.calcola_data_consegna(newPreventivo);
            }
            catch (...)
                response.send(Http::Code::Bad_Request, "");

            database.save()
                response.send(Http::Code::Ok, "");
        }
    };
}
>