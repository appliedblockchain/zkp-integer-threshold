const {
  encryptAgeLib,
  proveAgeLib,
  verifyAgeLib,
} = require('./zkp-range-proofs-age-lib')

const encryptAge = () => (
  encryptAgeLib()
)

const proveAge = () => (
  proveAgeLib()
)

const verifyAge = () => (
  verifyAgeLib()
)

module.exports = {
  encryptAge,
  proveAge,
  verifyAge,
}
