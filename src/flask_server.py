from flask import Flask, request, jsonify
import argparse
import json

app = Flask(__name__)

@app.route('/hello', methods=['POST'])
def hello():
    # return jsonify(hello = request.get_json().get('name'))
    return json.dumps({ 'hello': request.get_json().get('name')})

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Start server')
    parser.add_argument('-l', '--listen', help='interface to listen to', default='127.0.0.1')
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to bind to')

    args = parser.parse_args()
    print('Server starting at: ' + 'http://{}:{}'.format(args.listen, args.port))
    app.run(host=args.listen, port=args.port)