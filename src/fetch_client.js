const { PerformanceObserver, performance } = require('perf_hooks')
const fetch = require('node-fetch')

const apiUrl = 'http://127.0.0.1:5000/hello'

async function runTest() {
    let iters = 10000
    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Fran' })
    }

    console.log('fetch client <===> flask server')
    console.log('==============================')
    console.log(`Running test with ${iters} iterations...`)

    performance.mark('START')

    await (async function asyncLoop() {
        const response = await fetch(apiUrl, requestInit)
        const json = await response.json()
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