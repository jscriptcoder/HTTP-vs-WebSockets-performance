from flask import Flask, request, jsonify
import argparse
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
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='127.0.0.1')
    parser.add_argument('-p', '--port', default=5000, type=int)

    args = parser.parse_args()
    print('Server starting at: ' + 'http://{}:{}'.format(args.host, args.port))
    app.run(host=args.host, port=args.port)