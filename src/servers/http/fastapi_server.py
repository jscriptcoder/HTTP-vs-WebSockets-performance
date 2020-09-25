#!/usr/bin/env python

import uvicorn
import argparse
import json
from fastapi import FastAPI
from pydantic import BaseModel
from src.servers.config import host, port

app = FastAPI()

class Data(BaseModel): name: str

@app.post('/hello')
def hello(data: Data):
    return json.dumps({ 'hello': data.name })

def run_test():
    print('Server starting at ' + 'http://{}:{}'.format(host, port))
    uvicorn.run(app, host=host, port=port, log_level='error')

if __name__ == '__main__':
    run_test()