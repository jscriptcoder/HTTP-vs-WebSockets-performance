import axios from 'axios'
import { host, port, serverUrl, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { randomName } from '../utils'

export async function runTest() {
    console.log(`Axios client connecting to http://${host}:${port}`)

    const timer = new PerformanceTimer()

    console.log(`Running test with ${iters} iterations...`)

    timer.start()

    // async loop
    let i = iters
    await (async function asyncLoop() {
        const response = await axios.post(serverUrl, { name: randomName() })
        const { greeting } = response.data

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