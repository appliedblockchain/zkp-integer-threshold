const sha256 = require('sha256')

// KYC provider
const seed = '0000000000000000000000000000000027ae41e4649b934ca495991b7852b855'

A trusted central document authority that provides proof services.
P has requested a secret S from this authority, for use in proving her age. The authority assigns a secret (256 bit) S to P. Let’s say P's (S) is:




const encrypt = (age, seed) => {
  let h = seed
  for(let i=1; i<=(age+1); i++) {
    h = sha256(h)
  }
  return h
}

const prove = (age, ageToProove, seed) => {
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

const check = (encryptedAge, ageToProove, proof) =>{
  const verifiedAge = verifyAge(proof, ageToProove)
  return encryptedAge === verifiedAge
}

const requiredAge = 18
const age = 21

const encryptedAge = encrypt(age, seed)

// ran by
const proof  = prove(age, requiredAge, seed)

// ran by Service
const result = check(encryptedAge, requiredAge, proof)
console.log(result)
