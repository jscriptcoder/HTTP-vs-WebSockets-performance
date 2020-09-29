#!/usr/bin/env node

import { client as WebSocketClient} from 'websocket'
import { host, port, wsApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { 
    Deferred, 
    randomName, 
    createRequester, 
    log, 
    logError, 
    logConnecting, 
    logIterations 
} from '../utils'

async function runTest() {
    logConnecting('Websocket', `ws://${host}:${port}`)
    
    const timer = new PerformanceTimer()
    const connect = new Deferred()
    const client = new WebSocketClient()

    client.on('connect', connection => connect.resolve(connection))
    client.on('connectFailed', err => connect.reject(err))

    client.connect(wsApi)

    try {
        const connection = await connect.promise

        logIterations(iters)

        const requester = createRequester(data => connection.sendUTF(data))
        connection.on('message', message => requester.incoming.resolve(message))

        let i = iters
        await (async function asyncLoop() {
            const sendData = JSON.stringify({ name: randomName() })
            const message = await requester.greeting(sendData)
            const data = JSON.parse(message.utf8Data)
            const { greeting } = data

            if (--i === 0) {
                log(`Last greeting: ${greeting}`)
                return
            }
    
            await asyncLoop()
        })()

        timer.end()

        // https://www.iana.org/assignments/websocket/websocket.xhtml#close-code-number
        connection.close(1000, 'Done testing')
        
    } catch(err) {
        logError(err)
    }
}

if (require.main === module) {
    runTest()
}