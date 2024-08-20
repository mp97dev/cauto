#pragma once

#include <vector>
#include <iostream>
#include "usato.h"
#include "../sede.h"
#include "../macchine_management/macchine_management.h"
#include "../user_management/user_management.h"

namespace cauto
{
    class preventivo
    {
    public:
        // cauto::macchina macchina;
        // unsigned int data_scadenza; //?
        // unsigned int prezzo;
        // std::string utente;
        // unsigned int pagamento;
        // cauto::sede sede;
        // unsigned int data_consegna; //?
        // bool macchina_pronta;
        // cauto::usato usato;

        int id;
        cauto::macchina macchina;
        std::vector<cauto::optional> optionals;
        cauto::usato usato;
        cauto::user utente;
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
                {"macchina", macchina.toJson()},
                {"optionals", opt},
                {"oggetto", usato.toJson()},
                {"sconto", sconto},
                {"prezzo_finale", prezzo_finale},
                {"data_creazione", data_creazione},
                {"acconto", acconto},
                {"luogo_ritiro", luogo_ritiro.toJson()},
                {"data_scadenza", data_scadenza},
                {"data_consegna", data_consegna},
                {"utente", utente.toJson()}};
        }

        void fromJson(const json &j)
        {
            id = j.at("id").get<int>();
            macchina.fromJson(j.at("macchina").get<std::string>());
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
            utente.fromJson(j.at("utente").get<std::string>());
        }
    };
}