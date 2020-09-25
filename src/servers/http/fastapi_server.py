#!/usr/bin/env python

import uvicorn
import json
from fastapi import FastAPI
from pydantic import BaseModel
from src.servers.config import host, port
from src.servers.utils import random_greeting

app = FastAPI()

class Data(BaseModel): name: str

@app.post('/greeting')
def greeting(data: Data):
    greeting = random_greeting(data.name)
    return { 'greeting': greeting }

def run_test():
    print('Server starting at ' + 'http://{}:{}'.format(host, port))
    uvicorn.run(app, host=host, port=port, log_level='error')

if __name__ == '__main__':
    run_test()