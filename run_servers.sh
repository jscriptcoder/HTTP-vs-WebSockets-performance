#!/bin/bash

# Run all the servers

# HTTP servers
./src/servers/http/fastapi_server.py --port 5000 &
./src/servers/http/flask_server.py --port 5001 &
./src/servers/http/pyramid_server.py --port 5002 &
./src/servers/http/tornado_server.py --port 5003 &

# SocketIO servers
./src/servers/socketio/flask-socketio_server.py --port 5004 &
./src/servers/socketio/socketio_server.py --port 5005 &

# WebSocket servers
./src/servers/ws/eventlet_server.py --port 5006 &
./src/servers/ws/fastapi-websocket_server.py --port 5007 &
./src/servers/ws/tornado-websocket_server.py --port 5008 &
./src/servers/ws/websockets_server.py --port 5009 &