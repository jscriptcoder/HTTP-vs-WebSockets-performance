#!/usr/bin/env python

import uvicorn
from fastapi import FastAPI, WebSocket
from src.servers.config import host, port
from src.servers.utils import random_greeting

app = FastAPI()

@app.websocket("/greeting")
async def greeting(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_json()
            greeting = random_greeting(data['name'])
            await websocket.send_json({ 'greeting': greeting })
        except:
            await websocket.close()
            break

def run_test():
    print('Server starting at: ' + 'ws://{}:{}/greeting'.format(host, port))
    uvicorn.run(app, host=host, port=port, log_level='error')

if __name__ == '__main__':
    run_test()