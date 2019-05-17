'use strict'

const { createHash, randomBytes } = require('crypto')
const secret = randomBytes(32)

const hash = (data) => (
  createHash('sha256').update(data).digest() //.digest('hex')
)

const toHex = (value) => (
  Buffer.from(value).toString("hex")
)

const main = () => {
  const encryptInteger = (secretInteger, secret) => (
    [...Array(secretInteger + 1)].reduce((value, acc) => (
      hash(value)
    ), secret)
  )

  const genIntegerProof = (secretInteger, treshold, seed) => {
    let proof = secretInteger - treshold + 1
    proof = proof > 0 ? Array(proof) : []
    return [...proof].reduce((value, acc) => (
      hash(value)
    ), secret)
  }

  const verifyIntegerProof = (proof, treshold) => (
    [...Array(treshold)].reduce((value, acc) => (
      hash(value)
    ), proof)
  )

  // example

  // 21 = user's age
  // 18 = required age

  const encryptedInteger = encryptInteger(21, secret)
  console.log("encryptedInteger:", toHex(encryptedInteger))

  const integerProof = genIntegerProof(21, 18, secret)
  console.log("integerProof:", toHex(integerProof))

  const proofVerification = verifyIntegerProof(integerProof, 18)
  console.log("proofVerification:", toHex(proofVerification))

  const verified = encryptedInteger.equals(proofVerification)
  console.log("verified:", verified)
}

main()
