const { randomBytes } = require('crypto')
const { sha256Hash, hashTimes } = require('./lib/utils')

const genSecret = () => ( randomBytes(32) )

const encryptInteger = (integer, secret) => (
  hashTimes(integer+1, secret, sha256Hash)
)

const genIntegerThresholdProof = (integer, intThreshold, secret) => {
  const integerDifference = integer - intThreshold
  return hashTimes(integerDifference, secret, sha256Hash)
}

const verifyIntegerThreshold = (intThreshold, proof) => (
  hashTimes(intThreshold+1, proof, sha256Hash)
)

module.exports = {
  genSecret,
  encryptInteger,
  genIntegerThresholdProof,
  verifyIntegerThreshold,
}
