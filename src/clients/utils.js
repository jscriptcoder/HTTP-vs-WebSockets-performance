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

export function logConnecting(client, url) {
  log(`${chalk.green(client)} client connecting to ${chalk.yellow(url)}`)
}

export function logIterations(iters) {
  log(`Running test with ${chalk.cyan(`${iters} iterations`)}`)
}