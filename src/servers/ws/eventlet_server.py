#!/usr/bin/env python

import json
import eventlet
from eventlet import wsgi, websocket
from src.servers.config import host, port
from src.servers.utils import random_greeting

@websocket.WebSocketWSGI
def greeting_handle(ws):
    while True:
        message = ws.wait()
        if message is None: break
        
        data = json.loads(message)
        greeting = random_greeting(data['name'])
        ws.send(json.dumps({ 'greeting': greeting }))

def site(env, start_response):
    if env['PATH_INFO'] == '/greeting':
        return greeting_handle(env, start_response)
    else:
        start_response('200 OK', [('Content-Type', 'text/plain')])
        return ['Eventlet running...']

def run_test():
    # print('Server starting at: ' + 'ws://{}:{}'.format(host, port))
    listener = eventlet.listen((host, port))
    wsgi.server(listener, site)

if __name__ == '__main__':
    run_test()