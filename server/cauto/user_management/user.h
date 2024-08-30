#pragma once

#include <vector>
#include <iostream>

#include "../../json.hpp"
using json = nlohmann::json;

namespace cauto
{
    class user
    {
    public:
        std::string username;
        std::string password;
        std::string role;

        user(const std::string &usr, const std::string &pwd, const std::string &ruolo = "") : username(usr), password(pwd), role(ruolo) {}
        user() = default;

        const std::string getUsername()
        {
            return username;
        }

        const bool checkPassword(const std::string &pwd)
        {
            return pwd == password;
        }

        std::string getRole()
        {
            return role;
        }

        const json toJson()
        {
            return json{{"username", username}, {"password", password}, {"role", role}};
        }

        void fromJson(const json &j)
        {
            username = j.at("username").get<std::string>();
            password = j.at("password").get<std::string>();
            role = j.at("role").get<std::string>();
        }
    };
}