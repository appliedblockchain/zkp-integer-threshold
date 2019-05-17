const { generateKeyPair } = require('./crypto')

const apiKeys = {}

;(async () => {
  const { publicKey, privateKey } = await generateKeyPair()
  apiKeys.publicKey = publicKey
  apiKeys.privateKey = privateKey
})()

module.exports = apiKeys
