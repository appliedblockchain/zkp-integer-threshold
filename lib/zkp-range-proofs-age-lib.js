// Node < 10
// const sha256 = require('sha256')
// Node 10+
const { sha256 } = require('crypto')

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

const verifyAge = (proof, ageToProove) => {
  let h = proof
  for(let i=1; i<=ageToProove; i++) {
    h = sha256(h)
  }
  return h
}

module.exports = {
  encryptAge,
  proveAge,
  verifyAge,
}
