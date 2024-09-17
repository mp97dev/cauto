#pragma once

#include <vector>
#include <iostream>
#include "optional.h"

namespace cauto
{
    class macchina
    {
    public:
        std::string modello;
        std::string descrizione;
        int sconto;
        double prezzo_base;

        struct Dimensioni
        {
            double altezza;
            double lunghezza;
            double larghezza;
            double peso;
            double volume_bagagliaio;
        } dimensioni;

        struct Motore
        {
            std::string tipo;
            std::string alimentazione;
        } motore;

        struct Immagini
        {
            std::string vista_frontale;
            std::string vista_laterale;
            std::string vista_posteriore;
            std::vector<std::string> colori;
        } immagini;

        std::vector<cauto::optional> optionals;

        void fromJson(const json &j)
        {
            json opt = json::array();
            modello = j.at("modello").get<std::string>();
            descrizione = j.at("descrizione").get<std::string>();
            descrizione = j.at("descrizione").get<std::string>();
            prezzo_base = j.at("prezzo_base").get<int>();
            sconto = j.at("sconto").get<int>();
            dimensioni.altezza = j.at("dimensioni").at("altezza").get<double>();
            dimensioni.lunghezza = j.at("dimensioni").at("lunghezza").get<double>();
            dimensioni.larghezza = j.at("dimensioni").at("larghezza").get<double>();
            dimensioni.peso = j.at("dimensioni").at("peso").get<double>();
            dimensioni.volume_bagagliaio = j.at("dimensioni").at("volume_bagagliaio").get<double>();
            motore.tipo = j.at("motore").at("tipo").get<std::string>();
            motore.alimentazione = j.at("motore").at("alimentazione").get<std::string>();
            immagini.vista_frontale = j.at("immagini").at("vista_frontale").get<std::string>();
            immagini.vista_laterale = j.at("immagini").at("vista_laterale").get<std::string>();
            immagini.vista_posteriore = j.at("immagini").at("vista_posteriore").get<std::string>();
            immagini.colori = j.at("immagini").at("colori").get<std::vector<std::string>>();
            if (j.at("optionals").size() == 0)
                optionals = {};
            else
                for (const auto &item : j.at("optionals"))
                {
                    cauto::optional opt;
                    opt.fromJson(item);
                    optionals.push_back(opt);
                }
        }

        json toJson() const
        {
            json opt = json::array();
            for (cauto::optional o : optionals)
                opt.push_back(o.toJson());
            return json{
                {"modello", modello},
                {"descrizione", descrizione},
                {"sconto", sconto},
                {"prezzo_base", prezzo_base},
                {"dimensioni", {{"altezza", dimensioni.altezza}, {"lunghezza", dimensioni.lunghezza}, {"larghezza", dimensioni.larghezza}, {"peso", dimensioni.peso}, {"volume_bagagliaio", dimensioni.volume_bagagliaio}}},
                {"motore", {{"tipo", motore.tipo}, {"alimentazione", motore.alimentazione}}},
                {"immagini", {{"vista_frontale", immagini.vista_frontale}, {"vista_laterale", immagini.vista_laterale}, {"vista_posteriore", immagini.vista_posteriore}, {"colori", immagini.colori}}},
                {"optionals", opt}};
        }

        void add_optional(const optional &opt)
        {
            optionals.push_back(opt);
        }
    };
}