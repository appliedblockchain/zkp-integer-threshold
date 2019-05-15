const {
  encryptAgeLib,
  proveAgeLib,
  verifyAgeLib,
} = require('./zkp-range-proofs-age-lib')

const encryptAge = (age, seed) => (
  encryptAgeLib(age, seed)
)

const proveAge = (age, ageToProve, seed) => (
  proveAgeLib(age, ageToProve, seed)
)

const verifyAge = (proof, ageToProve) => (
  verifyAgeLib(proof, ageToProve)
)

module.exports = {
  encryptAge,
  proveAge,
  verifyAge,
}
