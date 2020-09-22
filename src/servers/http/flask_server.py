#!/usr/bin/env python

from flask import Flask, request, jsonify
import logging
from servers.config import host, port

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__)

@app.route('/hello', methods=['POST'])
def hello():
    return jsonify(hello = request.get_json().get('name'))

def run_test():
    print('Server starting at ' + 'http://{}:{}'.format(host, port))
    app.run(host=host, port=port)

if __name__ == '__main__':
    run_test()