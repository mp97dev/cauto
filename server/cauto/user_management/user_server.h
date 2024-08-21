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
            Rest::Routes::Post(router, "/api/signup", Rest::Routes::bind(&user_server::_api_signup, this));
            Rest::Routes::Post(router, "/api/login", Rest::Routes::bind(&user_server::_api_login, this));
        }

        void _api_signup(const Rest::Request &request, Http::ResponseWriter response)
        {
            json body;
            if (!kernel::valid_body(request, body))
                response.send(Http::Code::Bad_Request, "");

            cauto::user_management userManager;
            bool res = userManager.signup(body["username"].get<std::string>(), body["password"].get<std::string>());
            if (!res)
                response.send(Http::Code::Bad_Request, "");

            response.send(Http::Code::Ok, body["username"].get<std::string>());
        }

        void _api_login(const Rest::Request &request, Http::ResponseWriter response)
        {
            json body;
            if (!kernel::valid_body(request, body))
                response.send(Http::Code::Bad_Request, "");

            cauto::user_management userManager;
            bool res = userManager.login(body["username"].get<std::string>(), body["password"].get<std::string>());
            if (!res)
                response.send(Http::Code::Unauthorized, "");

            response.send(Http::Code::Ok, "");
        }
    };
}