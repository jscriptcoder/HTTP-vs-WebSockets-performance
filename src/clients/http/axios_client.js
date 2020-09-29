import axios from 'axios'
import { host, port, httpApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { randomName, log, logConnecting, logIterations } from '../utils'

export async function runTest() {
    logConnecting('Axios', `http://${host}:${port}`)
    logIterations(iters)

    const timer = new PerformanceTimer()
    timer.start()

    try {
        let i = iters
        await (async function asyncLoop() {
            const postData = { name: randomName() }
            const response = await axios.post(httpApi, postData)
            const { greeting } = response.data
    
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