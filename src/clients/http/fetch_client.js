#!/usr/bin/env node

const fetch = require('node-fetch')
const { host, port, serverUrl, iters } = require('../config')
const PerformanceTimer = require('../PerformanceTimer')

const requestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Fran' })
}

export async function runTest() {
    console.log(`Fetch client connecting to http://${host}:${port}`)

    const timer = new PerformanceTimer()

    console.log(`Running test with ${iters} iterations...`)

    timer.start()

    // async loop
    await (async function asyncLoop() {
        const response = await fetch(serverUrl, requestInit)
        const data = await response.json()
        const { hello } = data
        
        if (--iters === 0) return
        await asyncLoop()
    })()

    timer.end()
}

if (require.main === module) {
    runTest()
}