#pragma once

#include <vector>
#include <iostream>
#include "user.h"
#include "../../utils.h"
namespace cauto
{
    class user_management
    {
    private:
        json users;
        std::string file_path = "./db/users.json";

        void load_users()
        {
            std::ifstream file(file_path);
            if (file.is_open())
            {
                file >> users;
            }
        }

        void save_users()
        {
            std::ofstream file(file_path);
            if (file.is_open())
            {
                file << users.dump(4);
            }
        }

    public:
        user_management()
        {
            load_users();
        }

        bool signup(const std::string &username, const std::string &password)
        {
            for (unsigned int i = 0; i < users.size(); i++)
                if (users[i]["username"] == username)
                    return false;

            cauto::user newUser(username, password);
            users.push_back(newUser.toJson());
            save_users();
            return true;
        }

        bool login(const std::string &username, const std::string &password, std::string& role)
        {
            for (unsigned int i = 0; i < users.size(); i++)
                if (users[i]["username"] == username)
                {
                    cauto::user user;
                    user.fromJson(users[i]);
                    if (user.checkPassword(password))
                    {
                        role = user.role;
                        return true;
                    }
                }
            return false;
        }
    };
}