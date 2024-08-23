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
        std::optional<double> valutazione;

        json toJson() const
        {
            json res;
            res["immagini"] = immagini;
            res["descrizione"] = descrizione;
            if (valutazione.has_value())
                res["valutazione"] = valutazione.value();
            return res;
        }

        void fromJson(const json &j)
        {
            immagini = j.at("immagini").get<std::vector<std::string>>();
            descrizione = j.at("descrizione").get<std::string>();
            if (j.contains("valutazione"))
                valutazione = j.at("valutazione").get<double>();
        }
    };
}