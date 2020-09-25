#!/usr/bin/env python

from waitress import serve
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
from src.servers.config import host, port
from src.servers.utils import random_greeting

def greeting(request):
    data = request.json_body
    greeting = random_greeting(data['name'])
    return { 'greeting': greeting }

def run_test():
    # print('Server starting at ' + 'http://{}:{}'.format(host, port))

    with Configurator() as config:
        config.add_route('greeting', '/greeting')
        config.add_view(greeting, 
                        route_name='greeting', 
                        request_method='POST', 
                        renderer='json')
        
        app = config.make_wsgi_app()
    
    serve(app, host=host, port=port)

if __name__ == '__main__':
    run_test()