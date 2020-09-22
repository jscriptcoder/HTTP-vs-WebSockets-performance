#!/usr/bin/env node

const axios = require('axios')
const { host, port, serverUrl, iters } = require('../config')
const PerformanceTimer = require('../PerformanceTimer')

export async function runTest() {
    console.log(`Axios client connecting to http://${host}:${port}`)

    const timer = new PerformanceTimer()

    console.log(`Running test with ${iters} iterations...`)

    timer.start()

    // async loop
    await (async function asyncLoop() {
        const response = await axios.post(serverUrl, { name: 'Fran' })
        const { hello } = response.data
        
        if (--iters === 0) return
        await asyncLoop()
    })()

    timer.end()
}

if (require.main === module) {
    runTest()
}