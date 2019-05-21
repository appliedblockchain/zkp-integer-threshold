const Web3 = require('web3')

const params = {
  from: process.env.FROM || '0x1F2e5282481C07BC8B7b07E53Bc3EF6A8012D6b7'
}

const web3 = new Web3(process.env.PROVIDER || 'http://localhost:8545')

module.exports = {
  web3,
  params
}
