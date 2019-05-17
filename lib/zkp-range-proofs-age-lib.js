const hash = require('./hash')
const sha256 = hash

const encryptAge = (age, seed) => {
  let h = seed
  for (let i = 1; i <= (age + 1); i++) {
    h = sha256(h)
  }
  return h
}

const proveAge = (age, requiredAge, seed) => {
  const p = (age - requiredAge)
  let h = seed
  for (let i = 1; i <= p; i++) {
    h = sha256(h)
  }
  return h
}

const verifyAge = (proof, requiredAge) => {
  let h = proof
  for (let i = 1; i <= requiredAge + 1; i++) {
    h = sha256(h)
  }
  return h
}

encryptAgeLib = encryptAge
proveAgeLib = proveAge
verifyAgeLib = verifyAge

module.exports = {
  encryptAgeLib,
  proveAgeLib,
  verifyAgeLib
}
