import fetch from 'node-fetch'
import { host, port, serverUrl, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'

export async function runTest() {
    console.log(`Fetch client connecting to http://${host}:${port}`)

    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Fran' })
    }
    
    const timer = new PerformanceTimer()

    console.log(`Running test with ${iters} iterations...`)

    timer.start()

    // async loop
    let i = iters
    await (async function asyncLoop() {
        const response = await fetch(serverUrl, requestInit)
        const data = await response.json()
        const { hello } = data
        
        if (--i === 0) return
        await asyncLoop()
    })()

    timer.end()
}

if (require.main === module) {
    runTest()
}