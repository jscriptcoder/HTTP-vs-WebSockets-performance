import superagent from 'superagent'
import { host, port, httpApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { randomName, log, logError, logConnecting, logIterations } from '../utils'

export async function runTest() {
    logConnecting('SuperAgent', `http://${host}:${port}`)
    logIterations(iters)
    
    const timer = new PerformanceTimer()
    timer.start()

    try {
        let i = iters
        await (async function asyncLoop() {
            const postData = { name: randomName() }
            const response = await superagent
                .post(httpApi)
                .send(postData)
            const { greeting } = response.body
    
            if (--i === 0) {
                log(`Last greeting: ${greeting}`)
                return
            }
    
            await asyncLoop()
        })()
    } catch (err) {
        logError(err)
    }

    timer.end()
}

if (require.main === module) {
    runTest()
}