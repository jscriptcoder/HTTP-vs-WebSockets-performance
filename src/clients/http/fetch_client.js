import fetch from 'node-fetch'
import { host, port, httpApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { randomName } from '../utils'

export async function runTest() {
    console.log(`Fetch client connecting to http://${host}:${port}`)

    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }
    
    const timer = new PerformanceTimer()

    console.log(`Running test with ${iters} iterations...`)

    timer.start()

    let i = iters
    await (async function asyncLoop() {
        const body = JSON.stringify({ name: randomName() })
        const response = await fetch(httpApi, {...requestInit, body})
        const data = await response.json()
        const { greeting } = data

        if (--i === 0) {
            console.log(`Last greeting: ${greeting}`)
            return
        }

        await asyncLoop()
    })()

    timer.end()
}

if (require.main === module) {
    runTest()
}