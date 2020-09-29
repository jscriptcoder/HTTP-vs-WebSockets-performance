import fetch from 'node-fetch'
import { host, port, httpApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { randomName, logConnecting, logIterations } from '../utils'

const requestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}

export async function runTest() {
    logConnecting('Fetch', `http://${host}:${port}`)
    logIterations(iters)
    
    const timer = new PerformanceTimer()
    timer.start()

    try {
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
    } catch (err) {
        log(`Error: ${err}`)
    }

    timer.end()
}

if (require.main === module) {
    runTest()
}