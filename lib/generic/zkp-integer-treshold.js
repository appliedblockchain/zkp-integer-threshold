'use strict'

const { createHash, randomBytes } = require('crypto')
const secret = randomBytes(32)

const hash = (data) => (
  createHash('sha256').update(data).digest()
)

const hashTimes = (times, data) => {
  Array(times).reduce((acc) => (
    hash(acc)
  ), data)
}

const toHex = (value) => (
  Buffer.from(value).toString("hex")
)

const main = () => {
  const encryptInteger = (secretInteger, secret) => (
    hashTimes(secretInteger + 1, secret)
  )

  const genIntegerProof = (secretInteger, treshold, seed) => {
    const difference = secretInteger - treshold
    const proofTimes = difference > 0 ? Array(difference) : []
    hashTimes(proofTimes, secret)
  }

  const verifyIntegerProof = (proof, treshold) => (
    hashTimes(treshold + 1, proof)
  )

  // example

  // 4 (or 21) = user's age
  // 2 (or 18) = required age

  const age = process.argv[2] || 4
  const requiredAge = process.argv[3] || 2

  const encryptedInteger = encryptInteger(age, secret)
  console.log("encryptedInteger:", toHex(encryptedInteger))

  const integerProof = genIntegerProof(age, requiredAge, secret)
  console.log("integerProof:", toHex(integerProof))

  const proofVerification = verifyIntegerProof(integerProof, requiredAge)
  console.log("proofVerification:", toHex(proofVerification))

  const verified = encryptedInteger.equals(proofVerification)
  console.log("verified:", verified)
}

main()
