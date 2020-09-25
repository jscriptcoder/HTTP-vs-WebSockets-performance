#!/usr/bin/env python

import logging
from flask import Flask, request, jsonify
from src.servers.config import host, port
from src.servers.utils import random_greeting

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__)

@app.route('/greeting', methods=['POST'])
def greeting():
    json = request.get_json()
    name = json.get('name')
    greeting = random_greeting(name)
    return jsonify(greeting = random_greeting(name))

def run_test():
    print('Server starting at ' + 'http://{}:{}'.format(host, port))
    app.run(host=host, port=port)

if __name__ == '__main__':
    run_test()