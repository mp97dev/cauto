#pragma once

#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/router.h>
#include "../utils.h"
#include <vector>
#include <iostream>
#include "../json.hpp"
using json = nlohmann::json;

namespace cauto
{
    struct sede
    {
        int id;
        std::string nome;
        std::string indirizzo;

        void fromJson(const json &j)
        {
            id = j.at("id").get<int>();
            indirizzo = j.at("indirizzo").get<std::string>();
            nome = j.at("nome").get<std::string>();
        }

        json toJson() const
        {
            return {
                {"nome", nome},
                {"indirizzo", indirizzo},
                {"id", id}};
        }
    };

    struct sedi_management
    {
        std::vector<cauto::sede> concessionari;
        std::string file_path = "./db/sedi.json";

        json get_all_as_json()
        {
            std::ifstream file(file_path);
            json j;
            file >> j;
            return j;
        }

        void load_all()
        {
            json j = get_all_as_json();

            for (const auto &item : j)
            {
                cauto::sede c;
                c.fromJson(item);
                concessionari.push_back(c);
            }
        }

        std::vector<cauto::sede> get_all() const
        {
            return concessionari;
        }

        cauto::sede *findById(int id)
        {
            for (auto &c : concessionari)
            {
                if (c.id == id)
                {
                    return &c;
                }
            }
            return nullptr;
        }
    };

}

namespace rest_server
{
    using namespace Pistache;

    class sedi_server
    {
        friend class server;

    private:
        void _setup_routes(Rest::Router &router)
        {
            Rest::Routes::Get(router, "/api/sedi", Rest::Routes::bind(&sedi_server::_api_get_sedi, this));
        }

        void _api_get_sedi(const Rest::Request &request, Http::ResponseWriter response)
        {
            cauto::sedi_management db;
            response.send(Http::Code::Ok, (db.get_all_as_json()).dump());
            return;
        }
    };
}