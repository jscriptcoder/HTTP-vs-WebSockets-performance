#!/usr/bin/env python

from flask import Flask, render_template
from flask_socketio import SocketIO, send
import argparse
import logging

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('message', namespace='/greeting')
def greeting(data):
    send({'greeting': data['name']})

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='0.0.0.0')
    parser.add_argument('-p', '--port', default=5000, type=int)

    args = parser.parse_args()
    print('Server starting at: ' + 'ws://{}:{}'.format(args.host, args.port))
    socketio.run(app, host=args.host, port=args.port)