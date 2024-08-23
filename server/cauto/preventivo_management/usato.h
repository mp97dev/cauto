#pragma once

#include <vector>
#include <iostream>
#include "../../json.hpp"
using json = nlohmann::json;

namespace cauto
{
    class usato
    {
    public:
        std::string descrizione;
        std::vector<std::string> immagini;

        json toJson() const
        {
            return json{
                {"immagini", immagini},
                {"descrizione", descrizione}};
        }

        static usato fromJson(const json &j)
        {
            usato u;
            u.immagini = j.at("immagini").get<std::vector<std::string>>();
            u.descrizione = j.at("descrizione").get<std::string>();
            return u;
        }
    };
}