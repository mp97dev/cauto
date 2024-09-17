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
            Rest::Routes::Get(router, "/api/preventivi/user", Rest::Routes::bind(&preventivi_server::_api_get_preventivi_user, this));
            Rest::Routes::Post(router, "/api/preventivi", Rest::Routes::bind(&preventivi_server::_api_post_preventivi, this));
            Rest::Routes::Delete(router, "/api/preventivi/:id", Rest::Routes::bind(&preventivi_server::_api_delete_preventivi, this));
            Rest::Routes::Put(router, "/api/preventivi/usato/:id", Rest::Routes::bind(&preventivi_server::_api_put_preventivi_usato, this));
            Rest::Routes::Put(router, "/api/preventivi/acconto/:id", Rest::Routes::bind(&preventivi_server::_api_put_preventivi_acconto, this));
        }

        void _api_get_preventivi(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string> user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            if (user_data[1] != "segreteria" && user_data[1] != "impiegato")
            {
                response.send(Http::Code::Unauthorized, {});
                return;
            }

            cauto::preventivo_management database;
            response.send(Http::Code::Ok, (database.get_all_as_json()).dump());
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
                newPreventivo.fromJson(body);
                auto now = std::chrono::system_clock::now();
                newPreventivo.id = static_cast<int>(std::chrono::duration_cast<std::chrono::seconds>(now.time_since_epoch()).count());
                if (!newPreventivo.usato.has_value() || (newPreventivo.usato.value().descrizione == "" && newPreventivo.usato.value().immagini.size() == 0))
                {
                    newPreventivo.prezzo_finale = database.calcolaPrezzoFinale(newPreventivo);
                    if (newPreventivo.prezzo_finale < 0)
                    {
                        response.send(Http::Code::Expectation_Failed, {});
                        return;
                    }
                }
                newPreventivo.data_creazione = kernel::add_days("", 0);
                newPreventivo.data_scadenza = kernel::add_days(newPreventivo.data_creazione.value(), 20);
                newPreventivo.utente = user_data[0];
                if (newPreventivo.acconto > 0)
                    newPreventivo.data_consegna = database.calcola_data_consegna(newPreventivo);
            }
            catch (...)
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }
            database.preventivi.push_back(newPreventivo);
            database.save();
            response.send(Http::Code::Ok, {});
            return;
        }

        void _api_get_preventivi_user(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string> user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            cauto::preventivo_management database;
            database.get_all();
            json preventivi = json::array();
            database.find_by_user(user_data[0], preventivi);

            response.send(Http::Code::Ok, (preventivi).dump());
            return;
        }

        void _api_delete_preventivi(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string> user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            if (!request.hasParam(":id"))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            cauto::preventivo_management database;
            database.get_all();
            database.remove(request.param(":id").as<int>());
            database.save();
            response.send(Http::Code::Ok, {});
            return;
        }

        void _api_put_preventivi_usato(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string> user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            if (user_data[1] != "impiegato")
            {
                response.send(Http::Code::Unauthorized, {});
                return;
            }

            if (!request.hasParam(":id"))
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
            cauto::preventivo prev;
            database.find_by_id(request.param(":id").as<int>(), prev);

            if (!prev.usato.has_value())
            {
                response.send(Http::Code::Conflict, {});
                return;
            }

            prev.usato.value().valutazione = body["valutazione"].get<double>();
            prev.prezzo_finale = database.calcolaPrezzoFinale(prev);
            if (prev.prezzo_finale == 0)
            {
                response.send(Http::Code::Expectation_Failed, {});
                return;
            }
            prev.prezzo_finale =  prev.prezzo_finale.value() - prev.usato.value().valutazione.value();
            database.remove(request.param(":id").as<int>());
            database.preventivi.push_back(prev);
            database.save();
            response.send(Http::Code::Ok, {});
            return;
        }

        void _api_put_preventivi_acconto(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::vector<std::string> user_data;
            if (!kernel::get_user_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, {});
                return;
            }

            if (!request.hasParam(":id"))
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
            cauto::preventivo prev;
            database.find_by_id(request.param(":id").as<int>(), prev);

            if (prev.utente.value() != user_data[0])
            {
                response.send(Http::Code::Unauthorized, {});
                return;
            }

            if (database.check_se_scaduto(prev))
            {
                response.send(Http::Code::No_Content, {});
                return;
            }

            prev.acconto = body["acconto"].get<double>();
            if (prev.acconto > 0)
                    prev.data_consegna = database.calcola_data_consegna(prev);

            database.remove(request.param(":id").as<int>());
            database.preventivi.push_back(prev);
            database.save();
            response.send(Http::Code::Ok, {});
            return;
        }
    };
}