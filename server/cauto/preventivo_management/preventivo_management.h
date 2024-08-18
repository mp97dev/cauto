#pragma once

#include <vector>
#include <iostream>
#include "preventivo.h"

namespace cauto
{
    class preventivo_management
    {
        std::vector<cauto::preventivo> preventivi;
        std::string file_path = "./db/preventivi.json";

        void get_all()
        {
            std::ifstream file(file_path);
            json j;
            if (file.is_open())
                file >> j;

            for (const auto &item : j)
            {
                cauto::preventivo c;
                c.fromJson(item);
                preventivi.push_back(c);
            }
        }

        double calcolaPrezzoFinale(const std::vector<std::string>& optionals, const std::string& prezzo_base, const double& sconto)
        {
            double prezzo_optionals = 0.0;
            for (const auto &opt : optionals)
            {
                if (opt == "colore")
                    prezzo_optionals += 300.0;
                else if (opt == "ruota_di_scorta")
                    prezzo_optionals += 150.0;
                else if (opt == "ruotino_di_scorta")
                    prezzo_optionals += 100.0;
                else if (opt == "vetri_oscurati")
                    prezzo_optionals += 1000.0;
                else if (opt == "interni_in_pelle")
                    prezzo_optionals += 2000.0;
                else if (opt == "ruote_maggiorate")
                    prezzo_optionals += 1500.0;
            }

            double prezzo_totale = std::stoi(prezzo_base) + prezzo_optionals;

            prezzo_totale *= (1.0 - sconto / 100.0);

            return prezzo_totale;
        }

        void conferma()
        {
        }
        void elimina()
        {
        }
        bool check_scadenza()
        {
            return true;
        }
        void calcola_data_consegna()
        {
        }

        void to_pdf()
        {
        }

        void finalizza()
        {
        }
    };
}