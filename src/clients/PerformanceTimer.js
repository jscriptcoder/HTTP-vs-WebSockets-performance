const { PerformanceObserver, performance } = require('perf_hooks')

function performanceObserverCallback(items) {
    console.log('Timer stopped. Measuring...')
    console.log(`Duration: ${items.getEntries()[0].duration}`)
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