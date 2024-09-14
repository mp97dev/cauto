#pragma once

#include <iostream>
#include <vector>
#include <fstream>
#include <regex>
#include <sys/types.h>
#include <sys/stat.h>
#include <iomanip>
#include <filesystem>
#include <libgen.h>
#include <unistd.h>
#include <linux/limits.h>
#include <map>
#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/router.h>

#include "json.hpp"
using json = nlohmann::json;

namespace kernel
{
    using namespace Pistache;

    inline std::vector<std::string> split(const std::string &s, const char delim)
    {
        std::vector<std::string> result;
        std::stringstream ss(s);
        std::string item;

        while (getline(ss, item, delim))
            result.push_back(item);

        return result;
    }

    inline std::vector<std::string> split(const std::string &s, const std::string &str_of_delimiters)
    {
        std::regex re(str_of_delimiters);
        std::sregex_token_iterator first{s.begin(), s.end(), re, -1}, last;
        std::vector<std::string> tokens{first, last};

        return tokens;
    }

    inline bool file_exist(const std::string &path)
    {
        std::ifstream ifile;
        ifile.open(path.c_str());
        if (ifile)
        {
            ifile.close();
            return true;
        }

        return false;
    }

    inline bool folder_exist(const std::string &path)
    {
        struct stat info;
        if (stat(path.c_str(), &info) != 0)
            return false;
        return (info.st_mode & S_IFDIR) != 0;
    }

    inline std::string timestamp_rand_str()
    {
        return std::to_string(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()) + "#" + std::to_string(rand());
    }

    inline std::string create_tmp_file()
    {
        std::string tmp_str = "/tmp/" + timestamp_rand_str();
        std::ofstream(tmp_str.c_str());
        return tmp_str;
    }

    inline std::string replace_string_with_string(const std::string &str, const std::string &replace, const std::string &replacement)
    {
        std::string data(str);
        size_t pos = data.find(replace);
        while (pos != std::string::npos)
        {
            data.replace(pos, replace.size(), replacement);
            pos = data.find(replace, pos + replacement.size());
        }

        return data;
    }

    std::string add_days(const std::string &data, int giorni)
    {
        std::tm tm = {};

        if (data.empty())
        {
            std::time_t tempoAttuale = std::time(nullptr);
            tm = *std::localtime(&tempoAttuale);
        }
        else
        {
            std::stringstream ss(data);
            ss >> std::get_time(&tm, "%d-%m-%Y");
            if (ss.fail())
                return "";
        }

        tm.tm_isdst = -1; // ora legale
        std::time_t tempo = std::mktime(&tm);

        tempo += giorni * 24 * 60 * 60;
        tm = *std::localtime(&tempo);
        std::stringstream risultato;
        risultato << std::put_time(&tm, "%d-%m-%Y");

        return risultato.str();
    }

    inline void write_file(std::string filename, const std::string &file, const std::string folder_path)
    {
        std::fstream uzer_file;
        std::string file_path = folder_path + filename;
        std::regex re("\\((\\d+)\\)\\."); // looking for already existing ..(n) before extension (es sample (1).pdf)

        while (std::ifstream(file_path)) // does <filename> already esist ?
        {
            std::smatch matches;
            if (std::regex_search(filename, matches, re))
            {
                int it = std::stoi(matches[1].str()) + 1;
                filename = std::regex_replace(filename, re, "(" + std::to_string(it) + ").");
            }
            else
                filename = std::regex_replace(filename, std::regex("\\."), " (1).");

            file_path = folder_path + filename;
        }

        uzer_file.open(file_path, std::ios::out);
        if (uzer_file)
        {
            uzer_file << file;
            uzer_file.close();
        }
    }

    static inline bool get_user_from_access_token(const Http::Request &request, std::vector<std::string> &user_data)
    {
        if (!request.headers().has<Http::Header::Authorization>())
            return false;
        std::string raw_auth = request.headers().getRaw("Authorization").value();
        if (raw_auth.find("Bearer ") != std::string::npos)
            user_data = split(raw_auth.replace(0, 7, ""), "#");
        else
            user_data = split(raw_auth, "#");
        return true;
    }

    static inline bool valid_body(const Rest::Request &request, json &body) //, std::vector<std::string> fields)
    {
        if (request.body().empty())
            return false;
        else
        {
            if (!json::accept(request.body()))
                return false;
            else
            {
                body = json::parse(request.body());
                return true;
                // _body = json::parse(body);
                // for (std::string &f : fields)
                //     _valid &= _body.contains(f);
            }
        }
        return false;
    }
}
