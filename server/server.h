#pragma once

#include <pistache/endpoint.h>
#include <pistache/http.h>
#include <pistache/router.h>
#include "cauto/macchine_management/macchine_server.h"
#include "cauto/preventivo_management/preventivi_server.h"
#include "cauto/sede.h"
#include "cauto/user_management/user_server.h"

namespace rest_server
{
    using namespace Pistache;

    class server
    {
    private:
        std::shared_ptr<Http::Endpoint> _httpEndpoint;
        Rest::Router _router;
        Address _addr;

        macchine_server macchine;
        preventivi_server preventivi;
        sedi_server sedi;
        user_server users;

        void _setup_routes()
        {
            macchine._setup_routes(_router);
            preventivi._setup_routes(_router);
            sedi._setup_routes(_router);
            users._setup_routes(_router);
        }

    public:
        explicit server(Address addr) : _httpEndpoint(std::make_shared<Http::Endpoint>(addr))
        {
            _addr = addr;
        }

        void init(size_t thr = 2, unsigned long int max_req_size = 4096)
        {
            auto opts = Http::Endpoint::options()
                            .maxRequestSize(max_req_size)
                            .threads(static_cast<int>(thr))
                            .flags(Tcp::Options::ReuseAddr);
            _httpEndpoint->init(opts);
            _setup_routes();
        }

        void start()
        {
            _httpEndpoint->setHandler(_router.handler());
            // _httpEndpoint->useSSL(certificate, key);
            std::cout << "Server start listening at port " + std::to_string(_addr.port()) << std::endl;
            _httpEndpoint->serve();
        }
    };
}
