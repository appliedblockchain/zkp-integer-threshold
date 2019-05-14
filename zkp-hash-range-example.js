const { randomBytes, sha256 } = require('crypto')

const {
  encryptAge,
  proveAge,
  verifyAge,
} = require('./lib/zkp-range-proofs-age')


const ZKP = require('./lib/zkp')
const KYC = require('./lib/kyc')


const requiredAge = 18
const age = 21

const seed = crypto.randomByh

const encryptedAge = encryptAge(age, seed)

// ran by
const proof  = proveAge(age, requiredAge, seed)

// ran by Service
const result = checkAge(encryptedAge, requiredAge, proof)
console.log(result)
