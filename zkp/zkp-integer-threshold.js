const { randomBytes } = require('crypto')
const { sha256Hash, hashTimes } = require('./lib/utils')

const genSecret = () => ( randomBytes(32) )

const encryptInteger = (integer, secret) => (
  hashTimes(integer+1, secret, sha256Hash)
)

const genIntegerThresholdProof = (intThreshold, integer, secret) => {
  const integerDifference = intThreshold - integer +1
  return hashTimes(integerDifference, secret, sha256Hash)
}

const verifyIntegerThreshold = (intThreshold, proof) => (
  hashTimes(intThreshold, proof, sha256Hash)
)

module.exports = {
  genSecret,
  encryptInteger,
  genIntegerThresholdProof,
  verifyIntegerThreshold,
}
