import chalk from 'chalk'
import { PerformanceObserver, performance } from 'perf_hooks'
import EventEmitter from 'events'
import { log, round } from './utils'

function ms2sec(ms, fraction) {
    return `${round(ms/1000, fraction)}s`
}

export default class PerformanceTimer extends EventEmitter {
    startMark = 'START'
    endMark = 'END'

    constructor() {
        super()
        this.obs = new PerformanceObserver(this.observerCallback)
        this.obs.observe({ entryTypes: ['measure'] })
    }

    observerCallback = items => {
        const { duration } = items.getEntries()[0]
        this.emit('duration', duration)

        log('Timer stopped. Measuring...')
        log(`Duration: ${chalk.magenta(ms2sec(duration))}`)
        
        performance.clearMarks()
    }

    start() {
        log('Timer started...')
        performance.mark(this.startMark)
    }

    end() {
        performance.mark(this.endMark)
        performance.measure(`${this.startMark} to ${this.endMark}`, this.startMark, this.endMark)
    }
} 
