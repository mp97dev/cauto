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
        std::optional<int> id;
        std::string marca;
        std::string modello;
        std::vector<cauto::optional> optionals;
        std::optional<cauto::usato> usato;
        std::optional<std::string> utente;
        std::optional<int> sconto;
        std::optional<double> prezzo_finale;
        std::optional<std::string> data_creazione;
        std::optional<double> acconto;
        std::optional<sede> luogo_ritiro;
        std::optional<std::string> data_scadenza;
        std::optional<std::string> data_consegna;

        json toJson() const
        {
            json res;
            json opt = json::array();
            for (cauto::optional o : optionals)
                opt.push_back(o.toJson());

            if (id.has_value())
                res["id"] = id.value();
            res["marca"] = marca;
            res["modello"] = modello;
            res["optionals"] = opt;
            if (usato.has_value())
                res["usato"] = usato.value().toJson();
            if (utente.has_value())
                res["utente"] = utente.value();
            if (sconto.has_value())
                res["sconto"] = sconto.value();
            if (prezzo_finale.has_value())
                res["prezzo_finale"] = prezzo_finale.value();
            if (data_creazione.has_value())
                res["data_creazione"] = data_creazione.value();
            if (acconto.has_value())
                res["acconto"] = acconto.value();
            if (luogo_ritiro.has_value())
                res["luogo_ritiro"] = luogo_ritiro.value().toJson();
            if (data_scadenza.has_value())
                res["data_scadenza"] = data_scadenza.value();
            if (data_consegna.has_value())
                res["data_consegna"] = data_consegna.value();
            return res;
        }

        void fromJson(const json &j)
        {
            if (j.contains("id"))
                id = j.at("id").get<int>();
            marca = j.at("marca").get<std::string>();
            modello = j.at("modello").get<std::string>();
            for (const auto &item : j.at("optionals"))
            {
                cauto::optional opt;
                opt.fromJson(item);
                optionals.push_back(opt);
            }
            if (j.contains("utente"))
                utente = j.at("utente").get<std::string>();
            if (j.contains("usato"))
            {
                if (!usato.has_value())
                    usato.emplace();
                usato->fromJson(j.at("usato"));
            }
            if (j.contains("sconto"))
                sconto = j.at("sconto").get<int>();
            if (j.contains("prezzo_finale"))
                prezzo_finale = j.at("prezzo_finale").get<double>();
            if (j.contains("data_creazione"))
                data_creazione = j.at("data_creazione").get<std::string>();
            if (j.contains("acconto"))
                acconto = j.at("acconto").get<double>();
            if (j.contains("luogo_ritiro"))
            {
                if (!luogo_ritiro.has_value())
                    luogo_ritiro.emplace();
                luogo_ritiro->fromJson(j.at("luogo_ritiro"));
            }
            if (j.contains("data_scadenza"))
                data_scadenza = j.at("data_scadenza").get<std::string>();
            if (j.contains("data_consegna"))
                data_consegna = j.at("data_consegna").get<std::string>();
        }
    };
}