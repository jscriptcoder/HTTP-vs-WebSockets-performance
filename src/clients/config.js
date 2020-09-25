const { argv } = require('yargs')

export const { 
    port = 5000, 
    host = '0.0.0.0',
    iters = 10000
} = argv

export const httpApi = `http://${host}:${port}/greeting`
export const wsApi = `ws://${host}:${port}/greeting`