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
            Rest::Routes::Put(router, "/api/macchine/sconto", Rest::Routes::bind(&macchine_server::_api_put_macchine, this));
            Rest::Routes::Delete(router, "/api/macchine", Rest::Routes::bind(&macchine_server::_api_delete_macchine, this));
        }

        void _api_get_macchine(const Rest::Request &request, Http::ResponseWriter response)
        {
            cauto::macchine_management database;
            response.send(Http::Code::Ok, (database.get_all_as_json()).dump());
        }

        void _api_post_macchine(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string>  user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            if (user_data[1] != "segreteria")
            {
                response.send(Http::Code::Unauthorized, {});
                return;
            }

            json body;
            if (!kernel::valid_body(request, body))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            cauto::macchine_management database;
            database.get_all();

            cauto::macchina nuovoModello;
            if (database.find_modello(body["marca"].get<std::string>(), body["modello"].get<std::string>(), nuovoModello))
            {
                response.send(Http::Code::Conflict, {});
                return;
            }
            nuovoModello.fromJson(body);
            database.marche_auto[body["marca"].get<std::string>()].push_back(nuovoModello);
            database.save();

            response.send(Http::Code::Ok, {});
            return;
        }

        void _api_delete_macchine(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string>  user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            if (user_data[1] != "segreteria")
            {
                response.send(Http::Code::Unauthorized, {});
                return;
            }

            json body;
            if (!kernel::valid_body(request, body))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            cauto::macchine_management database;
            database.get_all();
            if (!database.remove(body["marca"].get<std::string>(), body["modello"].get<std::string>()))
            {
                response.send(Http::Code::No_Content, {});
                return;
            }
            database.save();
            response.send(Http::Code::Ok, {});
        }

        void _api_put_macchine(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string>  user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            if (user_data[1] != "segreteria")
            {
                response.send(Http::Code::Unauthorized, {});
                return;
            }

            json body;
            if (!kernel::valid_body(request, body))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            cauto::macchine_management database;
            database.get_all();
            cauto::macchina macchina;
            if (!database.find_modello(body["marca"].get<std::string>(), body["modello"].get<std::string>(), macchina))
            {
                response.send(Http::Code::No_Content, {});
                return;
            }
            macchina.sconto = body["sconto"].get<int>();
            if (!database.remove(body["marca"].get<std::string>(), body["modello"].get<std::string>()))
            {
                response.send(Http::Code::No_Content, {});
                return;
            }
            database.marche_auto[body["marca"].get<std::string>()].push_back(macchina);
            database.save();
            response.send(Http::Code::Ok, {});
        }
    };
}