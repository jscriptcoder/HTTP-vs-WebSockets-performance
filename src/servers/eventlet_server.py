import eventlet
from eventlet import wsgi, websocket
import argparse
import json

@websocket.WebSocketWSGI
def handle(ws):
    while True:
        message = ws.wait()
        if message is None: break
        
        data = json.loads(message)
        ws.send(json.dumps({ 'hello': data['name'] }))

def site(env, start_response):
    if env['PATH_INFO'] == '/hello':
        return handle(env, start_response)
    else:
        start_response('200 OK', [('Content-Type', 'text/plain')])
        return ['Eventlet running...']

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='0.0.0.0')
    parser.add_argument('-p', '--port', default=5000, type=int)

    args = parser.parse_args()
    print('Server starting at: ' + 'ws://{}:{}'.format(args.host, args.port))
    listener = eventlet.listen((args.host, args.port))
    wsgi.server(listener, site)