const WebSocketClient = require('websocket').client

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5002
const server = process.env.SERVER || 'unknown'
const wsApi = `ws://${host}:${port}/hello`

const client = new WebSocketClient()
 
client.on('connectFailed', error => {
    console.log(`Connect Error: ${error}`)
})
 
client.on('connect', connection => {
    console.log('WebSocket Client Connected')

    connection.on('error', error => {
        console.log(`Connection Error: ${error}`)
    })

    connection.on('close', () => {
        console.log('echo-protocol Connection Closed')
    })

    connection.on('message', message => {
        if (message.type === 'utf8') {
            console.log(`Received: ${message.utf8Data}`)
        }
    })
    
    function sendMessage() {
        if (connection.connected) {
            connection.sendUTF(JSON.stringify({ name: 'Fran' }))
        }
    }

    sendMessage()
})
 
client.connect(wsApi)