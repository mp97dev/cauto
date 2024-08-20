#pragma once

#include <vector>
#include <iostream>
#include "optional.h"

namespace cauto
{
    class macchina
    {
    public:
        std::string nome_univoco;
        std::string descrizione;
        std::string prezzo_base;

        struct Dimensioni
        {
            std::string altezza;
            std::string lunghezza;
            std::string peso;
            std::string volume_bagagliaio;
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
            nome_univoco = j.at("nome_univoco").get<std::string>();
            descrizione = j.at("descrizione").get<std::string>();
            prezzo_base = j.at("prezzo_base").get<std::string>();
            dimensioni.altezza = j.at("dimensioni").at("altezza").get<std::string>();
            dimensioni.lunghezza = j.at("dimensioni").at("lunghezza").get<std::string>();
            dimensioni.peso = j.at("dimensioni").at("peso").get<std::string>();
            dimensioni.volume_bagagliaio = j.at("dimensioni").at("volume_bagagliaio").get<std::string>();
            motore.tipo = j.at("motore").at("tipo").get<std::string>();
            motore.alimentazione = j.at("motore").at("alimentazione").get<std::string>();
            immagini.vista_frontale = j.at("immagini").at("vista_frontale").get<std::string>();
            immagini.vista_laterale = j.at("immagini").at("vista_laterale").get<std::string>();
            immagini.vista_posteriore = j.at("immagini").at("vista_posteriore").get<std::string>();
            immagini.colori = j.at("immagini").at("colori").get<std::vector<std::string>>();
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
                {"nome_univoco", nome_univoco},
                {"descrizione", descrizione},
                {"prezzo_base", prezzo_base},
                {"dimensioni", {{"altezza", dimensioni.altezza}, {"lunghezza", dimensioni.lunghezza}, {"peso", dimensioni.peso}, {"volume_bagagliaio", dimensioni.volume_bagagliaio}}},
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