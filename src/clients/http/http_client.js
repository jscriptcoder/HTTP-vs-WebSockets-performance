import http from 'http'
import { host, port, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { Deferred, randomName, logConnecting, logIterations } from '../utils'

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

const reqOptions = {
    hostname: host,
    port: port,
    path: '/greeting',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}

export async function runTest() {
    logConnecting('Http', `http://${host}:${port}`)
    logIterations(iters)

    const timer = new PerformanceTimer()
    timer.start()

    try {
        let i = iters
        await (async function asyncLoop() {
            const postData = JSON.stringify({ name: randomName() })
            const data = await request(reqOptions, postData)
            const { greeting } = data
    
            if (--i === 0) {
                console.log(`Last greeting: ${greeting}`)
                return
            }
    
            await asyncLoop()
        })()
    } catch (err) {
        log(`Error: ${err}`)
    }

    timer.end()
}

if (require.main === module) {
    runTest()
}