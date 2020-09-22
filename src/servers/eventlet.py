import eventlet
from eventlet import wsgi
from eventlet import websocket
import argparse

@websocket.WebSocketWSGI
def handle(ws):
    if ws.path == '/hello':
        while True:
            data = ws.wait()
            if m is None: break
            # ws.send(m)
            print(data)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='0.0.0.0')
    parser.add_argument('-p', '--port', default=5004, type=int)

    args = parser.parse_args()
    print('Server starting at: ' + 'ws://{}:{}'.format(args.host, args.port))
    listener = eventlet.listen((args.host, args.port))
    wsgi.server(listener)