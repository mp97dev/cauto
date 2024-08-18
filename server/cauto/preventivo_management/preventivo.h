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
        std::vector<std::string> optionals;
        cauto::usato usato;
        cauto::user utente;
        double sconto;
        double prezzo_finale;
        std::time_t data_creazione;
        double acconto;
        sede luogo_ritiro;
        std::time_t data_scadenza;
        std::time_t data_consegna;

        json toJson() const
        {
            return json{
                {"id", id},
                {"macchina", macchina.toJson()},
                {"optionals", optionals},
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
            optionals = j.at("optionals").get<std::vector<std::string>>();
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