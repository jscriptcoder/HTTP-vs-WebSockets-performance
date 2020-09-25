#!/usr/bin/env python

import asyncio
import websockets
import json
import argparse
import logging

logger = logging.getLogger('websockets.server')
logger.setLevel(logging.ERROR)

async def greeting(websocket, path):
    if path == '/greeting':
        while True:
            try:
                message = await websocket.recv()
                data = json.loads(message)
                await websocket.send(json.dumps({ 'greeting': data['name'] }))
            except:
                await websocket.close()
                break

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='0.0.0.0')
    parser.add_argument('-p', '--port', default=5005, type=int)

    args = parser.parse_args()
    print('Server starting at: ' + 'ws://{}:{}'.format(args.host, args.port))
    start_server = websockets.serve(greeting, host=args.host, port=args.port)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()