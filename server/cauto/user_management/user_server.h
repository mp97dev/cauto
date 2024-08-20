#pragma once

#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/router.h>
#include "./user_management.h"
#include "../../utils.h"

namespace rest_server
{
    using namespace Pistache;

    class user_server
    {
        friend class server;

    private:
        void _setup_routes(Rest::Router &router)
        {
            Rest::Routes::Post(router, "/api/users", Rest::Routes::bind(&user_server::_api_signup, this));
            Rest::Routes::Get(router, "/api/users", Rest::Routes::bind(&user_server::_api_login, this));
        }

        void _api_signup(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::string user_data;
            if (!kernel::get_user_id_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, "");
            }

            cauto::user_management userManager;
            bool res = userManager.signup("alice_visit", "password123");
            if (res)
                response.send(Http::Code::Ok, "");
            else
                response.send(Http::Code::Bad_Request, "");
        }

        void _api_login(const Rest::Request &request, Http::ResponseWriter response)
        {
            std::string user_data;
            if (!kernel::get_user_id_from_access_token(request, user_data))
            {
                response.send(Http::Code::Bad_Request, "");
            }
            
            cauto::user_management userManager;
            bool res = userManager.login("alice_visit", "password123");
            if (res)
                response.send(Http::Code::Ok, "");
            else
                response.send(Http::Code::Unauthorized, "");
        }
    };
}