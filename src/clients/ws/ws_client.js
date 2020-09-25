#!/usr/bin/env node

import WebSocket from 'ws'
import { host, port, wsApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { Deferred, createRequester, randomName } from '../utils'

async function runTest() {
    console.log(`ws client connecting to ws://${host}:${port}`)
    
    const timer = new PerformanceTimer()
    const connect = new Deferred()
    const ws = new WebSocket(wsApi)

    ws.on('open', () => connect.resolve())
    ws.on('error', err => connect.reject(err))

    try {
        await connect.promise

        console.log(`Running test with ${iters} iterations...`)

        const requester = createRequester(data => ws.send(data))
        ws.on('message', message => requester.incoming.resolve(message))

        let i = iters
        await (async function asyncLoop() {
            const sendData = JSON.stringify({ name: randomName() })
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