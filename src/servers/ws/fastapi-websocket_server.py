#!/usr/bin/env python

from fastapi import FastAPI, WebSocket
import argparse
import uvicorn

app = FastAPI()

@app.websocket("/hello")
async def hello(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_json()
            await websocket.send_json({ 'hello': data['name'] })
        except:
            await websocket.close()
            break

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--host', default='0.0.0.0')
    parser.add_argument('-p', '--port', default=5000, type=int)
    
    args = parser.parse_args()
    print('Server starting at: ' + 'ws://{}:{}/hello'.format(args.host, args.port))
    uvicorn.run(app, host=args.host, port=args.port, log_level='error')