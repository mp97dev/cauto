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

#include "json.hpp"
using json = nlohmann::json;

namespace kernel
{
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

    inline std::string time_HH_MM_SS()
    {
        using namespace std::chrono;

        auto now = system_clock::now();
        // get number of milliseconds for the current second
        auto ms = duration_cast<milliseconds>(now.time_since_epoch()) % 1000;
        // conversion
        auto timer = system_clock::to_time_t(now);
        std::tm bt = *std::localtime(&timer);

        std::ostringstream oss;

        oss << std::put_time(&bt, "%Y-%m-%dT%H:%M:%S");
        oss << '.' << std::setfill('0') << std::setw(3) << ms.count();

        return oss.str();
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

    inline std::string read_file_into_string(const std::string &path)
    {
        std::ifstream i_file(path);
        if (!i_file.is_open())
            return "";
        std::string content((std::istreambuf_iterator<char>(i_file)), std::istreambuf_iterator<char>());
        i_file.close();
        return content;
    }
}
