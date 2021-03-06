const { randomBytes } = require('crypto')
const { hashTimes } = require('./lib/utils')

const genSecret = () => (randomBytes(32))

const encryptInteger = (integer, secret) => (
  hashTimes(integer + 1, secret) // 18
)

/**
 * Prover creates a proof for the verifier
 *
 * @param { number } integer Secret integer
 * @param { number } threshold The required integer
 * @param { string } secret Unique secret seed for prover
 * @return { string } SHA256 hash
 */
const genIntegerProof = (integer, threshold, secret) => {
  const difference = integer - threshold

  if (difference < 0) {
    throw new Error(`Age cannot be less than ${threshold}`)
  }

  return hashTimes(difference, secret)
}

/**
 * Verifier checks that the proving kit is genuine and prover is over a certain age
 *
 * @param { string } proof SHA256 hash from prover
 * @param { number } threshold Age to prove required by verifier
 * @return { boolean }
 */
const verifyIntegerProof = (proof, threshold) => (
  hashTimes(threshold + 1, proof)
)

/**
 * Trusted authority creates a prover kit to send back to prover
 *
 * @param { string } id Id of prover
 * @param { string } transactionHash Transaction hash for the encrypted age
 * @return { object } Object with prover name, hash proof and trusted authority digital signature
 */
const generateProvingKit = (id, transactionHash) => {
  const provingKit = {
    id,
    timestamp: +new Date(),
    transactionHash
  }

  return provingKit
}

module.exports = {
  generateProvingKit,
  encryptInteger,
  genIntegerProof,
  verifyIntegerProof,
  genSecret
}
