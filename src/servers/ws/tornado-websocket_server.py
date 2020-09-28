#!/usr/bin/env python

import json
from tornado.web import Application
from tornado.ioloop import IOLoop
from tornado.websocket import WebSocketHandler
from tornado.httpserver import HTTPServer
from src.servers.config import host, port
from src.servers.utils import random_greeting

class GreetingHandler(WebSocketHandler):
    def on_message(self, message):
        data = json.loads(message)
        greeting = random_greeting(data['name'])
        self.write_message({ 'greeting': greeting })
    
def make_app():
    urls = [('/greeting', GreetingHandler)]
    return Application(urls)

def run_test():
    print('Server starting at ' + 'ws://{}:{}'.format(host, port))

    app = make_app()
    http_server = HTTPServer(app)
    http_server.listen(port, host)
    IOLoop.current().start()

if __name__ == '__main__':
    run_test()