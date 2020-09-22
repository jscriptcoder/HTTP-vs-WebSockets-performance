const { argv } = require('yargs')

export const { 
    port = 5000, 
    host = '0.0.0.0',
    iters = 10000
} = argv

export const serverUrl = `http://${host}:${port}/hello`