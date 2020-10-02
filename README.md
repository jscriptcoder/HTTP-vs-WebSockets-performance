# HTTP vs WebSockets performance

This is an experiment to compare HTTP vs WebSockets performance using `Python server` <==> `Nodejs client`. The idea is to find the best team to later on build AI agents on top of them.

I wrote an article about it in [Medium](https://medium.com/@jscriptcoder/http-vs-websocket-protocols-with-nodejs-clients-and-python-servers-3c830d703cbd)

## Libraries Tested

### Http Clients:
1. [Axios](https://github.com/axios/axios): “Promise based HTTP client for the browser and node.js”.
2. [Node-fetch](https://github.com/node-fetch/node-fetch): “A light-weight module that brings Fetch API to Node.js”.
3. [Superagent](https://visionmedia.github.io/superagent/): “light-weight progressive ajax API crafted for flexibility, readability, and a low learning curve…”
4. Plain [Http](https://nodejs.org/api/http.html): built-in Nodejs package to handle HTTP communication.

### Http Servers:
1. [FastAPI](https://fastapi.tiangolo.com/): “a high performance framework, easy to learn, fast to code, ready for production…”
2. [Flask](https://flask.palletsprojects.com/en/1.1.x/): it doesn’t need introduction, does it? This web framework is widely used to build Python backend.
3. [Pyramid](https://docs.pylonsproject.org/projects/pyramid/en/latest/): “small, fast, down-to-earth Python web framework…”
4. [Tornado](https://www.tornadoweb.org/en/stable/): “Python web framework and asynchronous networking library…”

### WebSocket Clients:
1. [Websocket-Node](https://github.com/theturtle32/WebSocket-Node): “pure JavaScript implementation of the WebSocket protocol versions 8 and 13 for Node”. I’m using here the client version.
2. [WS](https://github.com/websockets/ws): “simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation.”

### WebSocket Servers:
1. [Eventlet](https://eventlet.net/): “concurrent networking library for Python that allows you to change how you run your code, not how you write it…”
2. [FastAPI WebSockets](https://fastapi.tiangolo.com/advanced/websockets/): Http server FastAPI providing with WebSocket protocol.
3. [Tornado WebSockets](https://www.tornadoweb.org/en/stable/websocket.html): Http server Tornado providing with WebSocket protocol.
4. [WebSockets](https://websockets.readthedocs.io/en/stable/intro.html) python package: “a library for building WebSocket servers and clients in Python with a focus on correctness and simplicity.”
