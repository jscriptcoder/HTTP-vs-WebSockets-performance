#!/usr/bin/env python

from flask import Flask, request, jsonify
import logging
import json

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__)

@app.route('/hello', methods=['POST'])
def hello():
    # return jsonify(hello = request.get_json().get('name'))
    return json.dumps({ 'hello': request.get_json().get('name')})

if __name__ == '__main__':
    print('Server starting at: ' + 'http://127.0.0.1:5000')
    app.run()