#pragma once

#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/router.h>
#include <chrono>
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
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            if (user_data[1] != "segreteria" || user_data[1] != "impiegato")
            {
                response.send(Http::Code::Unauthorized, {});
                return;
            }

            cauto::preventivo_management database;
            response.send(Http::Code::Ok, database.get_all_as_json());
            return;
        }

        void _api_post_preventivi(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string> user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            json body;
            if (!kernel::valid_body(request, body))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            cauto::preventivo_management database;
            database.get_all();

            cauto::preventivo newPreventivo;
            try
            {
                auto now = std::chrono::system_clock::now();
                newPreventivo.id = static_cast<int>(std::chrono::duration_cast<std::chrono::seconds>(now.time_since_epoch()).count());
                newPreventivo.sconto = rand() % 30;
                newPreventivo.prezzo_finale = database.calcolaPrezzoFinale(body["macchina_marca"].get<std::string>(), body["macchina_modello"].get<std::string>(), newPreventivo.optionals, newPreventivo.sconto.value());
                if (newPreventivo.prezzo_finale == 0)
                {
                    response.send(Http::Code::Expectation_Failed, {});
                    return;
                }
                newPreventivo.data_creazione = kernel::add_days("", 0);
                newPreventivo.data_scadenza = kernel::add_days(newPreventivo.data_creazione.value(), 20);
                newPreventivo.data_consegna = database.calcola_data_consegna(newPreventivo);
            }
            catch (...)
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            database.save();
            response.send(Http::Code::Ok, {});
            return;
        }
    };
}