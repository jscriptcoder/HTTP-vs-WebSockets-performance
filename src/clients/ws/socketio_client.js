#!/usr/bin/env node

import io from 'socket.io-client'
import { host, port, wsApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { Deferred, randomName } from '../utils'

function createRequester(socket) {
    const requester = {
        incoming: null,
        greeting(data) {
            // new incoming message on the way
            const incoming = requester.incoming = new Deferred()
            socket.send(data)
            return incoming.promise
        }
    }

    return requester
}

async function runTest() {
    console.log(`SocketIO client connecting to http://${host}:${port}`)
    
    const timer = new PerformanceTimer()
    const connect = new Deferred()
    const socket = io(wsApi, { transports: ['websocket'] })
    
    socket.on('connect', () => connect.resolve())
    socket.on('connect_error', err => connect.reject(err))

    try {
        await connect.promise

        console.log(`Running test with ${iters} iterations...`)

        const requester = createRequester(socket)

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