#!/usr/bin/env node

const { PerformanceObserver, performance } = require('perf_hooks')
const WebSocket = require('ws')
import { randomName } from '../utils'

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000
const server = process.env.SERVER || 'unknown'
const wsApi = `ws://${host}:${port}/greeting`

let iters = 10000

async function runTest() {
    console.log(`ws client <===> ${server} server on ws://${host}:${port}/greeting`)
    
    const ws = new WebSocket(wsApi)

    function requestGreeting() {
        ws.send(JSON.stringify({ name: randomName() }))
    }

    ws.on('open', () => {
        console.log(`Running test with ${iters} iterations...`)

        ws.on('message', message => {
            const data = JSON.parse(message)
            const { greeting } = data
    
            if (--iters > 0) {
                requestGreeting()
            } else {
                performance.mark('END')
                performance.measure('START to END', 'START', 'END')

                ws.terminate()
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