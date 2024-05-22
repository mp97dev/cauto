#pragma once

#include <vector>
#include <iostream>
#include "optionals.h"
#include "dimensioni.h"

namespace cauto
{
    class macchina
    {
    public:
        std::string marca;
        std::string modello;
        unsigned int anno;
        unsigned int prezzo;
        std::vector<cauto::optional> optionals;
        cauto::dimensioni dimensioni;

        void elimina()
        {

        }
        void aggiungi()
        {

        }
        void modifica()
        {
            
        }
    };
}