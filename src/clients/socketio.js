const { PerformanceObserver, performance } = require('perf_hooks')
const io = require('socket.io-client')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5003
const server = process.env.SERVER || 'unknown'
const wsApi = `ws://${host}:${port}/hello`

let iters = 10000

async function runTest() {
    console.log(`SocketIO client <===> ${server} server on ws://${host}:${port}/hello`)
    console.log(`Running test with ${iters} iterations...`)

    const socket = io(wsApi, { transports: ['websocket'] })

    socket.on('connect', () => {

        function requestHello() {
            socket.send({ name: 'Fran' })
        }

        socket.on('message', data => {
            const { name } = data

            if (--iters > 0) {
                requestHello()
            } else {
                performance.mark('END')
                performance.measure('START to END', 'START', 'END')

                socket.close()
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