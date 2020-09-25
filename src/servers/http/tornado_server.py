#!/usr/bin/env python

import json
from tornado.web import Application, RequestHandler
from tornado.ioloop import IOLoop
from src.servers.config import host, port

class HelloHandler(RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        self.set_header('Content-Type', 'application/json')
        self.write(json.dumps({ 'hello': data['name'] }))

def make_app():
    urls = [('/hello', HelloHandler)]
    return Application(urls, debug=True)

def run_test():
    print('Server starting at ' + 'http://{}:{}'.format(host, port))

    app = make_app()
    app.listen(port, host)
    IOLoop.current().start()

if __name__ == '__main__':
    run_test()