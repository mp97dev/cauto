#pragma once

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
            nome = j.at("nome").get<std::string>();
            indirizzo = j.at("indirizzo").get<std::string>();
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

        void load_all()
        {
            std::ifstream file(file_path);
            json j;
            file >> j;

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