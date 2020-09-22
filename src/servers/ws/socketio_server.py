#!/usr/bin/env python

import eventlet
import socketio
import json
import argparse

sio = socketio.Server()
app = socketio.WSGIApp(sio)

# @sio.on('message', namespace='/hello')
# def hello(sid, data):
#     sio.send({'hello': data['name']}, namespace='/hello')

class HelloNamespace(socketio.Namespace):
    def on_message(self, sid, data):
        self.send({'hello': data['name']})

sio.register_namespace(HelloNamespace('/hello'))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='0.0.0.0')
    parser.add_argument('-p', '--port', default=5000, type=int)

    args = parser.parse_args()
    print('Server starting at: ' + 'ws://{}:{}'.format(args.host, args.port))
    eventlet.wsgi.server(eventlet.listen((args.host, args.port)), app)