# HTTP vs WebSockets performance

This is an experiment to compare HTTP vs WebSockets performance using `Python server` <==> `Nodejs client`. The idea is to find the best team to later on build AI agents on top of them.

I wrote an article about it in [Medium](https://medium.com/@jscriptcoder/http-vs-websocket-protocols-with-nodejs-clients-and-python-servers-3c830d703cbd)

## Libraries Tested

### Http Clients:
1. [Axios](https://github.com/axios/axios): “Promise based HTTP client for the browser and node.js”.
2. [Node-fetch](https://github.com/node-fetch/node-fetch): “A light-weight module that brings Fetch API to Node.js”.
3. [Superagent](https://visionmedia.github.io/superagent/): “light-weight progressive ajax API crafted for flexibility, readability, and a low learning curve…”
4. Plain [Http](https://nodejs.org/api/http.html): built-in Nodejs package to handle HTTP communication.
