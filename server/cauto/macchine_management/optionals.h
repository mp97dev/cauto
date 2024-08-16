#pragma once

#include <vector>
#include <iostream>
#include "../../json.hpp"
using json = nlohmann::json;

namespace cauto
{
    struct optionals
    {
        std::vector<std::string> colore;
        bool ruota_di_scorta;
        bool ruotino_di_scorta;
        bool vetri_oscurati;
        bool interni_in_pelle;
        std::vector<std::string> ruote_maggiorate;

        void fromJson(const json &j)
        {
            colore = j.at("colore").get<std::vector<std::string>>();
            ruota_di_scorta = j.at("ruota_di_scorta").get<bool>();
            ruotino_di_scorta = j.at("ruotino_di_scorta").get<bool>();
            vetri_oscurati = j.at("vetri_oscurati").get<bool>();
            interni_in_pelle = j.at("interni_in_pelle").get<bool>();
            ruote_maggiorate = j.at("ruote_maggiorate").at("dimensioni_disponibili").get<std::vector<std::string>>();
        }

        json toJson() const
        {
            return {
                {"colore", colore},
                {"ruota_di_scorta", ruota_di_scorta},
                {"ruotino_di_scorta", ruotino_di_scorta},
                {"vetri_oscurati", vetri_oscurati},
                {"interni_in_pelle", interni_in_pelle},
                {"ruote_maggiorate", {{"dimensioni_disponibili", ruote_maggiorate}}}};
        }
    };
}