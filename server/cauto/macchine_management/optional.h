#pragma once

#include <vector>
#include <iostream>
#include "../../json.hpp"
using json = nlohmann::json;

namespace cauto
{
    struct optional
    {
        std::string nome;
        double prezzo;
        std::vector<std::string> opzioni;

        optional(std::string nome, double prezzo, std::vector<std::string> opzioni) : nome(nome), prezzo(prezzo), opzioni(opzioni) {}
        optional() = default;

        void fromJson(const json &j)
        {
            nome = j.at("nome").get<std::string>();
            prezzo = j.at("prezzo").get<double>();
            opzioni = j.at("opzioni").get<std::vector<std::string>>();
        }

        json toJson() const
        {
            json opt = json::array();
            for (std::string o : opzioni)
                opt.push_back(o);
            return {
                {"nome", nome},
                {"prezzo", prezzo},
                {"opzioni", opt}};
        }
    };
}