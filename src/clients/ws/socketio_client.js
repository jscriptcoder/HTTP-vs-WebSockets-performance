#!/usr/bin/env node

import io from 'socket.io-client'
import { host, port, httpApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { Deferred, randomName } from '../utils'

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
        
        const requestGreeting = () => socket.send({ name: randomName() })
    
        socket.on('message', data => {
            const { greeting } = data
    
            if (--iters > 0) {
                requestGreeting()
            } else {
                console.log(`Last greeting: ${greeting}`)
                timer.end()
                socket.close()
            }
        })
    
        timer.start()
    
        requestGreeting()

    } catch(err) {
        console.error('Error connecting')
        socket.close()
    }
}

if (require.main === module) {
    runTest()
}