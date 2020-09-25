#!/usr/bin/env node

const { PerformanceObserver, performance } = require('perf_hooks')
const WebSocketClient = require('websocket').client
import { randomName } from '../utils'

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000
const server = process.env.SERVER || 'unknown'
const wsApi = `ws://${host}:${port}/greeting`

let iters = 10000

async function runTest() {
    console.log(`websocket client <===> ${server} server on ws://${host}:${port}/greeting`)
    
    const client = new WebSocketClient()

    client.on('connect', connection => {
        console.log(`Running test with ${iters} iterations...`)
        
        function requestGreeting() {
            connection.sendUTF(JSON.stringify({ name: randomName() }))
        }
    
        connection.on('message', message => {
            const data = JSON.parse(message.utf8Data)
            const { greeting } = data

            if (--iters > 0) {
                requestGreeting()
            } else {
                performance.mark('END')
                performance.measure('START to END', 'START', 'END')

                // https://www.iana.org/assignments/websocket/websocket.xhtml#close-code-number
                connection.close(1000, 'Done testing')
            }
            
        })

        performance.mark('START')

        requestGreeting()
    })

    client.connect(wsApi)
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