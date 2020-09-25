#!/usr/bin/env python

from waitress import serve
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
from src.servers.config import host, port

def hello(request):
    data = request.json_body
    return { 'hello': data['name'] }

def run_test():
    # print('Server starting at ' + 'http://{}:{}'.format(host, port))

    with Configurator() as config:
        config.add_route('hello', '/hello')
        config.add_view(hello, 
                        route_name='hello', 
                        request_method='POST', 
                        renderer='json')
        
        app = config.make_wsgi_app()
    
    serve(app, host=host, port=port)

if __name__ == '__main__':
    run_test()