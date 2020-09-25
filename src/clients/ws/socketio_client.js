#!/usr/bin/env node

import io from 'socket.io-client'
import { host, port, httpApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { Deferred, randomName, createRequester } from '../utils'

async function runTest() {
    console.log(`SocketIO client connecting to http://${host}:${port}`)
    
    const timer = new PerformanceTimer()
    const connect = new Deferred()
    const socket = io(httpApi, { transports: ['websocket'] })
    
    socket.on('connect', () => connect.resolve())
    socket.on('connect_error', err => connect.reject(err))

    try {
        await connect.promise

        console.log(`Running test with ${iters} iterations...`)

        const requester = createRequester(data => socket.send(data))
        socket.on('message', data => requester.incoming.resolve(data))

        let i = iters
        await (async function asyncLoop() {
            const sendData = { name: randomName() }
            const data = await requester.greeting(sendData)
            const { greeting } = data

            if (--i === 0) {
                console.log(`Last greeting: ${greeting}`)
                return
            }
    
            await asyncLoop()
        })()

        timer.end()
        socket.close()

    } catch(err) {
        console.error('Error connecting')
    }
}

if (require.main === module) {
    runTest()
}