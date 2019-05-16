const config = require('config')
const Mantle = require('@appliedblockchain/mantle')
const mantle = require('./mantle')

const msg = Mantle.generateHash(config.hashMsg)
const signature = Mantle.sign(msg, mantle.privateKey)

module.exports = signature