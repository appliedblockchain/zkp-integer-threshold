'use strict'
const { createHash, randomBytes } = require('crypto')

const hash = (data) => {
  const sha = createHash('sha256')
  sha.update(data)
  return sha.digest()
}

const newArray = (integer) => (
  integer > 0 ? Array(integer) : []
)

const hashTimes = (integer, initialData) => (
  [...newArray(integer)]
    .reduce((data) => (
      hash(data)
    ), initialData)
)

const encryptIntegerThreshold = (intThreshold, secret) => (
  hashTimes(intThreshold+1, secret)
)

const proveIntegerThreshold = (intThreshold, integer, secret) => {
  const integerDifference = intThreshold - integer +1
  return hashTimes(integerDifference, secret)
}

const verifyIntegerThreshold = (integer, proof) => (
  hashTimes(integer, proof)
)

module.exports = {
  encryptIntegerThreshold,
  proveIntegerThreshold,
  verifyIntegerThreshold,
}
