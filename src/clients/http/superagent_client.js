import superagent from 'superagent'
import { host, port, httpApi, iters } from '../config'
import PerformanceTimer from '../PerformanceTimer'
import { randomName } from '../utils'

export async function runTest() {
    console.log(`SuperAgent client connecting to http://${host}:${port}`)
    
    const timer = new PerformanceTimer()

    console.log(`Running test with ${iters} iterations...`)

    timer.start()

    let i = iters
    await (async function asyncLoop() {
        const postData = { name: randomName() }
        const response = await superagent
            .post(httpApi)
            .send(postData)
        const { greeting } = response.body

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