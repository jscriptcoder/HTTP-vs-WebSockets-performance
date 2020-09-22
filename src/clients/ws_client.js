const { PerformanceObserver, performance } = require('perf_hooks')
const WebSocket = require('ws')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000
const server = process.env.SERVER || 'unknown'
const wsApi = `ws://${host}:${port}/hello`

let iters = 10000

async function runTest() {
    console.log(`ws client <===> ${server} server on ws://${host}:${port}/hello`)
    
    const ws = new WebSocket(wsApi)

    function requestHello() {
        ws.send(JSON.stringify({ name: 'Fran' }))
    }

    ws.on('open', () => {
        console.log(`Running test with ${iters} iterations...`)

        ws.on('message', message => {
            const data = JSON.parse(message)
            const { hello } = data
    
            if (--iters > 0) {
                requestHello()
            } else {
                performance.mark('END')
                performance.measure('START to END', 'START', 'END')

                ws.terminate()
            }
        })

        performance.mark('START')

        requestHello()
    })
}

const obs = new PerformanceObserver(items => {
    console.log('End test')
    console.log(`Duration: ${items.getEntries()[0].duration}`)
    performance.clearMarks()
})

obs.observe({ entryTypes: ['measure'] })

runTest()