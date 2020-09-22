const { PerformanceObserver, performance } = require('perf_hooks')
const fetch = require('node-fetch')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000
const server = process.env.SERVER || 'unknown'
const apiUrl = `http://${host}:${port}/hello`

let iters = 10000
const requestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Fran' })
}

async function runTest() {
    console.log(`fetch client <===> ${server} server on http://${host}:${port}`)
    console.log(`Running test with ${iters} iterations...`)

    performance.mark('START')

    await (async function asyncLoop() {
        const response = await fetch(apiUrl, requestInit)
        const data = await response.json()
        const { hello } = data
        
        if (--iters === 0) return
        await asyncLoop()
    })()

    performance.mark('END')
    performance.measure('START to END', 'START', 'END')
}

const obs = new PerformanceObserver(items => {
    console.log('End test')
    console.log(`Duration: ${items.getEntries()[0].duration}`)
    performance.clearMarks()
})

obs.observe({ entryTypes: ['measure'] })

runTest()