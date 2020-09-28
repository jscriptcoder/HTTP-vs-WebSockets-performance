#!/usr/bin/env python

import eventlet
import socketio
import json
from src.servers.config import host, port
from src.servers.utils import random_greeting

sio = socketio.Server()
app = socketio.WSGIApp(sio)

# @sio.on('message', namespace='/greeting')
# def greeting(sid, data):
#     greeting = random_greeting(data['name'])
#     sio.send({ 'greeting': greeting }, namespace='/greeting')

class GreetingNamespace(socketio.Namespace):
    def on_message(self, sid, data):
        greeting = random_greeting(data['name'])
        self.send({ 'greeting': greeting })

sio.register_namespace(GreetingNamespace('/greeting'))

def run_test():
    # print('Server starting at: ' + 'ws://{}:{}'.format(host, port))
    eventlet.wsgi.server(eventlet.listen((host, port)), app)

if __name__ == '__main__':
    run_test()