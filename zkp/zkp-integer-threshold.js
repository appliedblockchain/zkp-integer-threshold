const { randomBytes } = require('crypto')
const { sha256Hash, hashTimes } = require('./lib/utils')

const genSecret = () => ( randomBytes(32) )

const encryptIntegerThreshold = (intThreshold, secret) => (
  hashTimes(intThreshold+1, secret, sha256Hash)
)

const genIntegerThresholdProof = (intThreshold, integer, secret) => {
  const integerDifference = intThreshold - integer +1
  return hashTimes(integerDifference, secret, sha256Hash)
}

const verifyIntegerThreshold = (integer, proof) => (
  hashTimes(integer, proof, sha256Hash)
)

module.exports = {
  genSecret,
  encryptIntegerThreshold,
  genIntegerThresholdProof,
  verifyIntegerThreshold,
}
