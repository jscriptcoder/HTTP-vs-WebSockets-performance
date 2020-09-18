const { PerformanceObserver, performance } = require('perf_hooks')
const WebSocketClient = require('websocket').client

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5002
const server = process.env.SERVER || 'unknown'
const wsApi = `ws://${host}:${port}/hello`

let iters = 10000

async function runTest() {
    console.log(`websocket client <===> ${server} server on http://${host}:${port}/hello`)
    console.log(`Running test with ${iters} iterations...`)

    const client = new WebSocketClient()

    client.on('connectFailed', error => console.error(`Connect Error: ${error}`))

    client.on('connect', connection => {
        connection.on('error', error => console.error(`Connection Error: ${error}`))
    
        function requestHello() {
            connection.sendUTF(JSON.stringify({ name: 'Fran' }))
        }
    
        connection.on('message', message => {
            const data = message.utf8Data
            if (--iters > 0) {
                requestHello()
            } else {
                performance.mark('END')
                performance.measure('START to END', 'START', 'END')

                // https://www.iana.org/assignments/websocket/websocket.xhtml#close-code-number
                connection.close(1000, 'Done testing')
            }
            
        })

        performance.mark('START')

        requestHello()
    })

    client.connect(wsApi)
}

const obs = new PerformanceObserver(items => {
    console.log('End test')
    console.log(`Duration: ${items.getEntries()[0].duration}`)
    performance.clearMarks()
})

obs.observe({ entryTypes: ['measure'] })

runTest()