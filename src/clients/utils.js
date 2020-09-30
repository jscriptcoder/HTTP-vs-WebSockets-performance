import chalk from 'chalk'
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals
} from 'unique-names-generator'

const rndNamesConfig = {
  dictionaries: [adjectives, colors, animals],
  separator: ' ',
  style: 'capital',
}

export function randomName() {
  return uniqueNamesGenerator(rndNamesConfig)
}

// Would be great to have Promise.defer :_(
export class Deferred {
  resolve = null
  reject = null
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

export function createRequester(sender) {
  const requester = {
      incoming: null,
      greeting(data) {
          // new incoming message on the way
          const incoming = requester.incoming = new Deferred()
          sender(data)
          return incoming.promise
      }
  }
  
  return requester
}

export function round(number, fraction=2) {
  return number.toFixed(fraction)
}

export const log = console.log

const port2serverMap = {
  5000: 'FastAPI',
  5001: 'Flask',
  5002: 'Pyramid',
  5003: 'Tornado',
  5004: 'Flask-Socket.IO',
  5005: 'Python-Socket.IO',
  5006: 'Eventlet',
  5007: 'FastAPI WebSocket',
  5008: 'Tornado WebSocket',
  5009: 'WebSockets'
}

export function logConnecting(client, url, serverByPort=true) {
  let message = ''
  const clientConnectingTo = `${chalk.green(client)} client connecting to`
  if (serverByPort) {
    const port = url.match(/:(\d+)/)[1]
    const server = port2serverMap[port]
    const serverOn = `${chalk.cyan(server)} on`
    message = `${clientConnectingTo} ${serverOn} ${chalk.yellow(url)}`
  } else {
    message = `${clientConnectingTo} ${chalk.yellow(url)}`
  }

  log(message)
}

export function logIterations(iters) {
  log(`Running test with ${chalk.red(iters.toLocaleString())} iterations`)
}

export function logError(err) {
  log(chalk.red(`${err}`))
}

export function range(start=0, end) {
  const [s, e] = typeof end === 'undefined' ? [0, start] : [start, end]
  return [...Array(e-s).keys()].map(i => s + i)
}