```js
const hash = require('./hash')
const sha256 = hash




// AgeToProve ≤ ActualAge

const secret = randomBytes(32)

const hash = () => {} // ...require('crypto') - sha256 ...

const verifiedAge = hash(2)(proof) // ran by verifier

const proof = hash(hash(secret)) // ran by user

const encryptedAge = hash(4)(S)

VerifiedAge=EncryptedAge


////
const secret = randomBytes(32)

const hash = () => {} // ...require('crypto') - sha256 ...

// secretNumber  = 4 // or secretAge
// threshold = 2

const encryptedAge = hash(hash(hash(hash(secret)))) // secretNumber + 1 times hash()

const proof = hash(secret) // hash once

const verifiedAge = hash(hash(hash(proof))) // 4 - 2 + 1 // threshold - secretNumber + 1

const ageCheck = -> { encryptedAge === verifiedAge }

ageCheck()



// you could write this also as:


const encryptedAge = hash(4)("foo"))))  // or hash4(secret) where hash4 = hash(4) - 4 because 4 is the secretNumber

const proof = hash("foo")

const verifiedAge = hash(3)(proof) // 3 = 4 - 2 + 1 // verifiedAge = secretNumber - threshold + 1

const ageCheck = -> { 4 === 4 }

ageCheck()




/////////////////////

/// DROP From here

number   = 2
threshold = 4

// 3 hashes on top of the secret

actualAge = -> (secret) { hash(hash(hash(secret))) }

hash(hash(hash(secret))

// or in a more compact form:

H(H(H(secret))

actualAge = -> (S) { H(H(H(S))) }


const encryptAge = (age, seed) => {
  let h = seed
  for(let i=1; i<=(age+1); i++) {
    h = sha256(h)
  }
  return h
}

const proveAge = (age, requiredAge, seed) => {
  const ageDifference = (age - requiredAge)
  let h = seed
  for(let i=1; i<=ageDifference; i++) {
    h = sha256(h)
  }
  return h
}

const verifyAge = (proof, requiredAge) => {
  let h = proof
  for(let i=1; i<=requiredAge+1; i++) {
    h = sha256(h)
  }
  return h
}

encryptAgeLib = encryptAge
proveAgeLib   = proveAge
verifyAgeLib  = verifyAge

module.exports = {
  encryptAgeLib,
  proveAgeLib,
  verifyAgeLib,
}
```

/// NOTES


// number   = 2
// threshold = 4
//
// // 3 hashes on top of the secret
//
// actualAge = -> (secret) { hash(hash(hash(secret))) }
//
// hash(hash(hash(secret))
//
// // or in a more compact form:
//
// H(H(H(secret))
//
// actualAge = -> (S) { H(H(H(S))) }
