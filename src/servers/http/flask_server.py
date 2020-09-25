#!/usr/bin/env python

import logging
from flask import Flask, request, jsonify
from src.servers.config import host, port

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__)

@app.route('/hello', methods=['POST'])
def hello():
    json = request.get_json()
    name = json.get('name')
    return jsonify(hello = name)

def run_test():
    print('Server starting at ' + 'http://{}:{}'.format(host, port))
    app.run(host=host, port=port)

if __name__ == '__main__':
    run_test()