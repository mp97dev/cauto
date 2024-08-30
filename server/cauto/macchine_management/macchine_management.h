#pragma once

#include <vector>
#include <iostream>
#include "macchina.h"

namespace cauto
{
    class macchine_management
    {
    public:
        std::map<std::string, std::vector<cauto::macchina>> marche_auto;
        std::string file_path = "./db/macchine.json";

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

            for (const auto &[brand, models] : j.items())
            {
                std::vector<cauto::macchina> carModels;
                for (const auto &model : models)
                {
                    cauto::macchina carModel;
                    carModel.fromJson(model);
                    carModels.push_back(carModel);
                }
                marche_auto[brand] = carModels;
            }
        }

        void save() const
        {
            json j;

            for (const auto &[brand, models] : marche_auto)
            {
                for (const auto &model : models)
                {
                    j[brand].push_back(model.toJson());
                }
            }

            std::ofstream file(file_path);
            file << j.dump(4);
        }

        bool remove(const std::string &brand, const std::string &model_name)
        {
            auto it = marche_auto.find(brand);
            if (it != marche_auto.end())
            {
                auto &models = it->second;
                auto remove_it = std::remove_if(models.begin(), models.end(),
                                                [&model_name](const cauto::macchina &model)
                                                {
                                                    return model.modello == model_name;
                                                });

                if (remove_it != models.end())
                {
                    models.erase(remove_it, models.end());
                    return true;
                }
            }
            return false;
        }

        bool find_modello(const std::string &brand, const std::string &model_name, cauto::macchina &macchina)
        {
            auto it = marche_auto.find(brand);
            if (it == marche_auto.end())
                return false;

            std::vector<cauto::macchina> &models = it->second;
            for (cauto::macchina& model : models)
            {
                if (model.modello == model_name)
                {
                    macchina = model;
                    return true;
                }
            }
            return false;
        }
    };
}