const sha256 = require('sha256')


// Paper: https://cs.nyu.edu/~mwalfish/papers/vex-sigcomm13.pdf

// Underliying principle:
//
// an entity encodes a value V in the length of a hash chain and commits to the
// value by exposing the tail of the hash chain; later, given a query Q,
// the entity can prove that V ≥ Q (without disclosing V), by revealing
// an appropriate node in the hash chain

// This example: https://stratumn.com/uploads/zkp-hash-chains-2.png
// https://stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/

// Parties:
//
// KYC - Trusted Authority - Government or KYC Provider
//
// User - Paula - Prover - User / Client
//
// Service - Milena - Verifier - Service Provider (Bike service provider / Gambling platform, etc.)
//

// Milena sends Paula a challenge: “Prove you are at least 18”
//
// Paula sends Milena the response: 90d17d7dcd91b4cd4a3e740c15cabac368e32381f68f9d221b7135d38a6845a7
//
// Milena verifies the response is correct: “Ok, I am convinced”

// ----

// Setup:
// User is registered with KYC provider (provider has ID details of User)

// mobile-app.js
//
// KYC.register()

// User asks KYC provider for a secret (hash seed)

// mobile-app.js
//
// KYC.requestSecret()
//

// KYC provider is able to provide a secret to User

// provider-api.js
//
// API.on("POST /secrets", (ctx) => {
//   ctx.res(200, { seed: seed })
// })
//

// KYC provider calculates the `encryptedAge`

// provider-process.js
//
// encryptedAge = ZKP.encryptAge(age, seed)
//

// https://stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/

// A trusted central document authority that provides proof services.
// P has requested a secret S from this authority, for use in proving her age. The authority assigns a secret (256 bit) S to P. Let’s say P's (S) is:


const encryptAge = (age, seed) => {
  let h = seed
  for(let i=1; i<=(age+1); i++) {
    h = sha256(h)
  }
  return h
}

const proveAge = (age, ageToProove, seed) => {
  const p = (1 + age - ageToProove)
  let h = seed
  for(let i=1; i<=p; i++) {
    h = sha256(h)
  }
  return h
}

const verifyAge = (proof, ageToProove) =>{
  let h = proof
  for(let i=1; i<=ageToProove; i++) {
    h = sha256(h)
  }
  return h
}

const checkAge = (encryptedAge, ageToProove, proof) =>{
  const verifiedAge = verifyAge(proof, ageToProove)
  return encryptedAge === verifiedAge
}

const requiredAge = 18
const age = 21

const encryptedAge = encryptAge(age, seed)

// ran by
const proof  = proveAge(age, requiredAge, seed)

// ran by Service
const result = checkAge(encryptedAge, requiredAge, proof)
console.log(result)
