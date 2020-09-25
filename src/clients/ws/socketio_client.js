#!/usr/bin/env node

const { PerformanceObserver, performance } = require('perf_hooks')
const io = require('socket.io-client')
import { randomName } from '../utils'

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000
const server = process.env.SERVER || 'unknown'
const wsApi = `ws://${host}:${port}/greeting`

let iters = 10000

async function runTest() {
    console.log(`SocketIO client <===> ${server} server on ws://${host}:${port}/greeting`)
    
    const socket = io(wsApi, { transports: ['websocket'] })

    socket.on('connect', () => {
        console.log(`Running test with ${iters} iterations...`)
        
        function requestGreeting() {
            socket.send({ name: randomName() })
        }

        socket.on('message', data => {
            const { greeting } = data

            if (--iters > 0) {
                requestGreeting()
            } else {
                performance.mark('END')
                performance.measure('START to END', 'START', 'END')

                socket.close()
            }
        })

        performance.mark('START')

        requestGreeting()
    })
}

const obs = new PerformanceObserver(items => {
    console.log('End test')
    console.log(`Duration: ${items.getEntries()[0].duration}`)
    performance.clearMarks()
})

obs.observe({ entryTypes: ['measure'] })

if (require.main === module) {
    runTest()
}