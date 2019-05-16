const config = require('config')
const Mantle = require('@appliedblockchain/mantle')

const mantle = new Mantle()
mantle.loadMnemonic(config.mnemonic)

module.exports = mantle