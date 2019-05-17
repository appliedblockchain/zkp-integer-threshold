'use strict'

const { createHash, randomBytes } = require('crypto')
const secret = randomBytes(32)

const hash = (data) => (
  createHash('sha256').update(data).digest()
)

const toHex = (value) => (
  Buffer.from(value).toString("hex")
)

// secretInteger (secretAge   = 4)
// threshold      (agethreshold = 2)

const encryptedInteger = hash(hash(hash(hash(hash("foo"))))) // integer + 1 times hash()
console.log("encryptedInteger:", toHex(encryptedInteger))

const integerProof = hash(hash(hash("foo"))) // integer - threshold + 1, in this example: 4 - 2 + 1 times hash()
console.log("integerProof:", toHex(integerProof))

const verifiedAge = hash(hash(integerProof)) // threshold - 1 times hash()
console.log("verifiedAge:", toHex(verifiedAge))

const ageCheck = () => ( encryptedInteger.equals(verifiedAge) )

console.log("verified?", ageCheck())
