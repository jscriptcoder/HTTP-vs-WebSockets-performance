#!/usr/bin/env python

import json
from tornado.web import Application, RequestHandler
from tornado.ioloop import IOLoop
from src.servers.config import host, port
from src.servers.utils import random_greeting

class GreetingHandler(RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        greeting = random_greeting(data['name'])
        self.set_header('Content-Type', 'application/json')
        self.write(json.dumps({ 'greeting': greeting }))

def make_app():
    urls = [('/greeting', GreetingHandler)]
    return Application(urls, debug=True)

def run_test():
    print('Server starting at ' + 'http://{}:{}'.format(host, port))

    app = make_app()
    app.listen(port, host)
    IOLoop.current().start()

if __name__ == '__main__':
    run_test()