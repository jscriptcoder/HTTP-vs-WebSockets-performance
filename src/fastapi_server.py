from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import argparse
import json

app = FastAPI()

class Who(BaseModel): name: str

@app.post('/hello')
def hello(who: Who):
    return json.dumps({ 'hello': who.name })

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Start server')
    parser.add_argument('-l', '--host', help='interface to listen to', default='127.0.0.1')
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to bind to')
    
    args = parser.parse_args()
    print('Server starting at: ' + 'http://{}:{}'.format(args.host, args.port))
    uvicorn.run(app, host=args.host, port=args.port, log_level='error')