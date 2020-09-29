import chalk from 'chalk'
import { PerformanceObserver, performance } from 'perf_hooks'
import { log, round } from './utils'

function ms2sec(ms, fraction) {
    return `${round(ms/1000, fraction)}s`
}

function performanceObserverCallback(items) {
    log('Timer stopped. Measuring...')
    log(`Duration: ${chalk.magenta(ms2sec(items.getEntries()[0].duration))}`)
    performance.clearMarks()
}

export default class PerformanceTimer {
    startMark = 'START'
    endMark = 'END'

    constructor() {
        this.obs = new PerformanceObserver(performanceObserverCallback)
        this.obs.observe({ entryTypes: ['measure'] })
    }

    start() {
        console.log('Timer started...')
        performance.mark(this.startMark)
    }

    end() {
        performance.mark(this.endMark)
        performance.measure(`${this.startMark} to ${this.endMark}`, this.startMark, this.endMark)
    }
} 