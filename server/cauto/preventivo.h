#pragma once

#include <vector>
#include <iostream>
#include "macchina.h"
#include "usato.h"
#include "sede.h"

namespace cauto
{
    class preventivo
    {
    public:
        cauto::macchina macchina;
        unsigned int data_scadenza; //?
        unsigned int prezzo;
        std::string utente;
        unsigned int pagamento;
        cauto::sede sede;
        unsigned int data_consegna; //?
        bool macchina_pronta;
        cauto::usato usato;

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