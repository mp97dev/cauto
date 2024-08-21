#pragma once

#include <vector>
#include <iostream>
#include "./usato.h"
#include "../sede.h"
#include "../macchine_management/optional.h"

namespace cauto
{
    class preventivo
    {
    public:
        int id;
        std::string macchina_marca;
        std::string macchina_modello;
        std::vector<cauto::optional> optionals;
        cauto::usato usato;
        std::string utente;
        double sconto;
        double prezzo_finale;
        std::string data_creazione;
        double acconto;
        sede luogo_ritiro;
        std::string data_scadenza;
        std::string data_consegna;

        json toJson() const
        {
            json opt = json::array();
            for (cauto::optional o : optionals)
                opt.push_back(o.toJson());
            return json{
                {"id", id},
                {"macchina_marca", macchina_marca},
                {"macchina_marca", macchina_modello},
                {"optionals", opt},
                {"oggetto", usato.toJson()},
                {"sconto", sconto},
                {"prezzo_finale", prezzo_finale},
                {"data_creazione", data_creazione},
                {"acconto", acconto},
                {"luogo_ritiro", luogo_ritiro.toJson()},
                {"data_scadenza", data_scadenza},
                {"data_consegna", data_consegna},
                {"utente", utente}};
        }

        void fromJson(const json &j)
        {
            id = j.at("id").get<int>();
            macchina_marca = j.at("macchina_marca").get<std::string>();
            macchina_marca = j.at("macchina_modello").get<std::string>();
            for (const auto &item : j.at("optionals"))
            {
                cauto::optional opt;
                opt.fromJson(item);
                optionals.push_back(opt);
            }
            usato.fromJson(j.at("usato").get<std::string>());
            sconto = j.at("sconto").get<double>();
            prezzo_finale = j.at("prezzo_finale").get<double>();
            data_creazione = j.at("data_creazione").get<std::string>();
            acconto = j.at("acconto").get<double>();
            luogo_ritiro.fromJson(j.at("luogo_ritiro").get<std::string>());
            data_scadenza = j.at("data_scadenza").get<std::string>();
            data_consegna = j.at("data_consegna").get<std::string>();
            utente = j.at("utente").get<std::string>();
        }
    };
}