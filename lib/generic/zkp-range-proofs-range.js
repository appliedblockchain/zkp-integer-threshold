const hash = require('../hash')
const sha256 = hash

const encryptRange = (number, seed) => (
  let h = seed
  for(let i=1; i<=(number+1); i++) {
    h = sha256(h)
  }
  return h
)

const proveRange = (number, treshold, seed) => (
  const ageDifference = (1 + number - treshold)
  let h = seed
  for(let i=1; i<=ageDifference; i++) {
    h = sha256(h)
  }
  return h
)

const verifyRange = (proof, treshold) => (
  let h = proof
  for(let i=1; i<=treshold; i++) {
    h = sha256(h)
  }
  return h
)

module.exports = {
  encryptRange,
  proveRange,
  verifyRange,
}
