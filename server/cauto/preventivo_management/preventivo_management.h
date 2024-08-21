#pragma once

#include <vector>
#include <iostream>
#include "preventivo.h"
#include "../macchine_management/macchine_management.h"
#include "../../utils.h"

namespace cauto
{
    class preventivo_management
    {
        std::vector<cauto::preventivo> preventivi;
        std::string file_path = "./db/preventivi.json";

        json get_all_as_json()
        {
            std::ifstream file(file_path);
            json j;
            if (file.is_open())
                file >> j;
            return j;
        }

        void get_all()
        {
            json j = get_all_as_json();

            for (const auto &item : j)
            {
                cauto::preventivo c;
                c.fromJson(item);
                preventivi.push_back(c);
            }
        }

        double calcolaPrezzoFinale(const std::string &macchina_marca, const std::string &macchina_modello, const std::vector<cauto::optional> &optionals, const double &sconto)
        {
            cauto::macchina macchina;
            if (!macchine_management::find_modello(macchina_marca, macchina_modello, macchina))
                return 0;

            double prezzo_optionals = 0.0;
            for (const cauto::optional &opt : optionals)
            {
                for (const cauto::optional o : macchina.optionals)
                    if (o.nome == opt)
                        prezzo_optionals += o.prezzo;
            }

            double prezzo_totale = std::stoi(macchina.prezzo_base) + prezzo_optionals;
            prezzo_totale *= (1.0 - sconto / 100.0);
            return prezzo_totale;
        }

        // void conferma()
        // {
        // }

        bool remove(const int &id)
        {
            auto remove_it = std::remove_if(preventivi.begin(), preventivi.end(),
                                            [&id](const cauto::preventivo &prev)
                                            {
                                                return prev.id == id;
                                            });

            if (remove_it != preventivi.end())
            {
                preventivi.erase(remove_it, preventivi.end());
                return true;
            }
            return false;
        }

        bool find_by_id(const int &id, cauto::preventivo& prev)
        {
            for (cauto::preventivo& preventivo : preventivi)
            {
                if (preventivo.id == id)
                {
                    prev = preventivo;
                    return true;
                }
            }
            return false;
        }

        bool check_se_scaduto(cauto::preventivo &preventivo)
        {
            std::tm tm = {};
            std::stringstream ss(preventivo.data_scadenza);
            ss >> std::get_time(&tm, "%d-%m-%Y");

            if (ss.fail())
                return true;

            tm.tm_isdst = -1;
            std::time_t data_scadenza = std::mktime(&tm);
            std::time_t ora = std::time(nullptr);

            if (data_scadenza >= ora)
                return true;
            return false;
        }

        std::string calcola_data_consegna(cauto::preventivo &preventivo)
        {
            if (preventivo.acconto == 0)
                return "";

            int days = 31 + (preventivo.optionals.size() * 10);
            return kernel::add_days("", days);
        }

        void save()
        {
            json j;
            for (const cauto::preventivo : preventivi)
                j.push_back(preventivo.toJson());

            std::ofstream file(file_path);
            file << j.dump(4);
        }

        // void to_pdf()
        // {
        // }

        // void finalizza()
        // {
        // }
    };
}