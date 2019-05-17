const hash = require('../hash')
const sha256 = hash

const toHex = (value) => (
  Buffer.from(value).toString("hex")
)

const encryptInteger = (integer, seed) => (
  let h = seed
  for(let i=1; i<=(integer+1); i++) {
    h = sha256(h)
  }
  return h
)

const proveInteger = (integer, threshold, seed) => (
  const difference = integer - threshold
  let h = seed
  for(let i=1; i <= (difference+1); i++) {
    h = sha256(h)
  }
  return h
)

const verifyInteger = (proof, threshold) => (
  let h = proof
  for(let i=1; i<=threshold; i++) {
    h = sha256(h)
  }
  return h
)

module.exports = {
  encryptInteger,
  proveInteger,
  verifyInteger,
}
