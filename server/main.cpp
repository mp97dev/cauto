#include "utils.h"
#include "server.h"
#include "cauto/user_management/user_management.h"
#include "cauto/macchine_management/macchine_management.h"
#include "cauto/sede.h"

#include <functional>

int main(int argc, char *argv[])
{
    //* test signup and login ----------------------------------------------------------------
    // cauto::user_management userManager;
    // bool res = userManager.signup("alice_visit", "password123");
    // std::cout << res << std::endl;
    // res = userManager.login("alice_visit", "password123");
    // std::cout << res << std::endl;
    // res = userManager.login("alice_", "password123");
    // std::cout << res << std::endl;

    //* test creazione rimozione auto --------------------------------------------------------
    // cauto::macchine_management database;
    // database.get_all();

    //* aggiunta
    // cauto::macchina nuovoModello;
    // nuovoModello.nome_univoco = "Toyota Yaris 2024";
    // nuovoModello.descrizione = "City car compatta e moderna.";
    // nuovoModello.prezzo_base = "20000";
    // nuovoModello.dimensioni = {"1500 mm", "3940 mm", "1040 kg", "286 L"};
    // nuovoModello.motore = {"1.5L 3 cilindri", "Ibrida"};
    // nuovoModello.immagini = {"yaris_frontale.jpg", "yaris_laterale.jpg", "yaris_posteriore.jpg", {"yaris_bianco.jpg"}};
    // nuovoModello.optionals = {
    //     {"Bianco", "Rosso"}, true, true, true, true, {"16\"", "17\""}};

    // database.marche_auto["Toyota"].push_back(nuovoModello);
    // database.save();

    //* rimozione
    // database.remove("Toyota", "Toyota Yaris 2024");
    // database.save();

    //* get sedi ---------------------------------------------------------------------------
    // cauto::sedi_management db;
    // db.load_all();

    // for (const auto& c : db.get_all()) {
    //     std::cout << "ID: " << c.id << "\nNome: " << c.nome << "\nIndirizzo: " << c.indirizzo << "\n\n";
    // }

}