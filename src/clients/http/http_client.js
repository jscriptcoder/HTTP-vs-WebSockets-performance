import http from 'http'
import { host, port, serverUrl, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'

// Would be great to have Promise.defer :_(
class Deferred {
    resolve = null
    reject = null
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    }
}

async function request(reqOptions, postData) {
    const deferred = new Deferred() // Promise.defer() => not supported

    const req = http.request(reqOptions, resp => {
        let strData = ''

        // A chunk of data has been recieved.
        resp.on('data', chunk => strData += chunk)

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const data = JSON.parse(strData)
            deferred.resolve(data)
        })

    })
    
    req.on('error', err => {
        console.log(err)
        deferred.reject(err)
    })

    req.write(postData)
    req.end()

    return deferred.promise
}

export async function runTest() {
    console.log(`Http client connecting to http://${host}:${port}`)

    const reqOptions = {
        hostname: host,
        port: port,
        path: '/hello',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }
    
    const postData = JSON.stringify({ name: 'Fran' })

    const timer = new PerformanceTimer()

    console.log(`Running test with ${iters} iterations...`)

    timer.start()

    let i = iters
    await (async function asyncLoop() {
        const data = await request(reqOptions, postData)
        const { hello } = data

        if (--i === 0) return
        await asyncLoop()
    })()

    timer.end()
}

if (require.main === module) {
    runTest()
}