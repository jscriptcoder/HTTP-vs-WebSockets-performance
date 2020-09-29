#!/usr/bin/env python

from flask import Flask, render_template
from flask_socketio import SocketIO, send
from src.servers.config import host, port
from src.servers.utils import random_greeting

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('message', namespace='/greeting')
def greeting(data):
    greeting = random_greeting(data['name'])
    send({ 'greeting': greeting })

def run_test():
    print('Server starting at: ' + 'http://{}:{}'.format(host, port))
    socketio.run(app, host=host, port=port)

if __name__ == '__main__':
    run_test()