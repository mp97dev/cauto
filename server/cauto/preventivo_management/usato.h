#pragma once

#include <vector>
#include <iostream>
#include "optionals.h"

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
            u.immagini = j.at("immagini").get<std::string>();
            u.descrizione = j.at("descrizione").get<std::string>();
            return u;
        }
    };
}