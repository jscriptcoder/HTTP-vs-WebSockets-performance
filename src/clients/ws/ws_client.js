#!/usr/bin/env node

import WebSocket from 'ws'
import { host, port, wsApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { Deferred, randomName } from '../utils'

function createRequester(ws) {
    const requester = {
        incoming: null,
        greeting(data) {
            // new incoming message on the way
            const incoming = requester.incoming = new Deferred()
            ws.send(JSON.stringify(data))
            return incoming.promise
        }
    }

    return requester
}

async function runTest() {
    console.log(`ws client connecting to ws://${host}:${port}/greeting`)
    
    const timer = new PerformanceTimer()
    const connect = new Deferred()
    const ws = new WebSocket(wsApi)

    ws.on('open', () => connect.resolve())
    ws.on('error', err => connect.reject(err))

    try {
        await connect.promise

        console.log(`Running test with ${iters} iterations...`)

        const requester = createRequester(ws)

        ws.on('message', message => requester.incoming.resolve(message))

        let i = iters
        await (async function asyncLoop() {
            const sendData = { name: randomName() }
            const message = await requester.greeting(sendData)
            const data = JSON.parse(message)
            const { greeting } = data

            if (--i === 0) {
                console.log(`Last greeting: ${greeting}`)
                return
            }
    
            await asyncLoop()
        })()

        timer.end()
        ws.terminate()

    } catch(err) {
        console.error('Error connecting')
    }
}

if (require.main === module) {
    runTest()
}