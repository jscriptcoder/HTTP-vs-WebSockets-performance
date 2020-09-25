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