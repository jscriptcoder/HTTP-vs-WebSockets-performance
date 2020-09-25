#!/usr/bin/env python

import asyncio
import websockets
import json
from src.servers.config import host, port
from src.servers.utils import random_greeting

async def greeting(websocket, path):
    if path == '/greeting':
        while True:
            try:
                message = await websocket.recv()
                data = json.loads(message)
                greeting = random_greeting(data['name'])
                await websocket.send(json.dumps({ 'greeting': greeting }))
            except:
                await websocket.close()
                break

def run_test():
    print('Server starting at: ' + 'ws://{}:{}'.format(host, port))
    start_server = websockets.serve(greeting, host=host, port=port)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()

if __name__ == '__main__':
    run_test()