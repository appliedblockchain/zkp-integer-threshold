'use strict'


const { createHash, randomBytes } = require('crypto')
const secret = randomBytes(32)

const hash = (data) => (
  createHash('sha256').update(data).digest()
)

const toHex = (value) => (
  Buffer.from(value).toString("hex")
)

const main = () => {
  const encryptInteger = (secretInteger, secret) => (
    Array(secretInteger + 1).reduce((acc) => (
      hash(acc)
    ), secret)
  )

  const genIntegerProof = (secretInteger, treshold, seed) => {
    const difference = secretInteger - treshold
    const proof = difference > 0 ? Array(difference) : []
    return proof.reduce((acc) => (
      hash(acc)
    ), secret)
  }

  const verifyIntegerProof = (proof, treshold) => (
    Array(treshold + 1).reduce((acc) => (
      hash(acc)
    ), proof)
  )

  // example

  // 4 (or 21) = user's age
  // 2 (or 18) = required age

  const encryptedInteger = encryptInteger(4, secret)
  console.log("encryptedInteger:", toHex(encryptedInteger))

  const integerProof = genIntegerProof(4, 2, secret)
  console.log("integerProof:", toHex(integerProof))

  const proofVerification = verifyIntegerProof(integerProof, 2)
  console.log("proofVerification:", toHex(proofVerification))

  const verified = encryptedInteger.equals(proofVerification)
  console.log("verified:", verified)
}

main()
