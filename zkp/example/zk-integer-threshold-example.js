const { randomBytes } = require('crypto')
const {
  encryptInteger,
  genIntegerProof,
  verifyIntegerProof
} = require('..')

const int = 8 // >= 7 will pass, < 7 will fail
const threshold = 7
const secret = randomBytes(32)
const enc = encryptInteger(int, secret)
const proof = genIntegerProof(int, threshold, secret)
const verification = verifyIntegerProof(proof, threshold)
console.log('ENC', verification)
console.log(`enc: ${enc.toString('hex')}\nverif: ${verification.toString('hex')}, proof: ${proof.toString('hex')}`)
const verified = enc.equals(verification)
console.log('verified: ', verified)
