#pragma once

#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/router.h>
#include "./macchine_management.h"
#include "../../utils.h"

namespace rest_server
{
    using namespace Pistache;

    class macchine_server
    {
        friend class server;

    private:
        void _setup_routes(Rest::Router &router)
        {
            Rest::Routes::Get(router, "/api/macchine", Rest::Routes::bind(&macchine_server::_api_get_macchine, this));
            Rest::Routes::Post(router, "/api/macchine", Rest::Routes::bind(&macchine_server::_api_post_macchine, this));
            Rest::Routes::Delete(router, "/api/macchine", Rest::Routes::bind(&macchine_server::_api_delete_macchine, this));
        }

        void _api_get_macchine(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string>  user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, "");
            }

            if (user_data[1] != "segreteria")
                response.send(Http::Code::Unauthorized, "");

            cauto::macchine_management database;
            response.send(Http::Code::Ok, database.get_all_as_json());
        }

        void _api_post_macchine(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string>  user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, "");
            }

            if (user_data[1] != "segreteria")
                response.send(Http::Code::Unauthorized, "");

            json body;
            if (!kernel::valid_body(request, body))
                response.send(Http::Code::Bad_Request, "");

            cauto::macchine_management database;
            database.get_all();

            cauto::macchina nuovoModello;
            nuovoModello.nome_univoco = body["nome_univoco"].get<std::string>();
            nuovoModello.descrizione = body["descrizione"].get<std::string>();
            nuovoModello.prezzo_base = body["prezzo_base"].get<int>();
            nuovoModello.dimensioni.altezza = body["dimensioni"]["altezza"].get<std::string>();
            nuovoModello.dimensioni.lunghezza = body["dimensioni"]["lunghezza"].get<std::string>();
            nuovoModello.dimensioni.peso = body["dimensioni"]["peso"].get<std::string>();
            nuovoModello.dimensioni.volume_bagagliaio = body["dimensioni"]["volume_bagagliaio"].get<std::string>();
            nuovoModello.motore.alimentazione = body["motore"]["alimentazione"].get<std::string>();
            nuovoModello.motore.tipo = body["motore"]["tipo"].get<std::string>();
            nuovoModello.immagini.vista_frontale = body["immagini"]["vista_frontale"].get<std::string>();
            nuovoModello.immagini.vista_laterale = body["immagini"]["vista_laterale"].get<std::string>();
            nuovoModello.immagini.vista_posteriore = body["immagini"]["vista_posteriore"].get<std::string>();
            nuovoModello.immagini.colori = body["immagini"]["colori"].get<std::vector<std::string>>();
            for (auto &optional : body["optionals"])
                nuovoModello.add_optional(cauto::optional(optional["nome"].get<std::string>(), optional["prezzo"].get<double>(), optional["opzioni"]));

            database.marche_auto[body["marca"].get<std::string>()].push_back(nuovoModello);
            database.save();

            response.send(Http::Code::Ok, nuovoModello.toJson());
        }

        void _api_delete_macchine(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string>  user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, "");
            }

            if (user_data[1] != "segreteria")
                response.send(Http::Code::Unauthorized, "");

            json body;
            if (!kernel::valid_body(request, body))
                response.send(Http::Code::Bad_Request, "");

            cauto::macchine_management database;

            database.remove(body["marca"].get<std::string>(), body["nome_univoco"].get<std::string>());
            database.save();
            response.send(Http::Code::Ok, database.get_all_as_json());
        }
    };
}