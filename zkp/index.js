/**
 * Trusted authority creates a prover kit to send back to prover
 *
 * @param { string } name Name of prover
 * @param { string } secretSeed Unique secret seed for prover
 * @param { string } privateKey Private key used to create a digital signature
 * @return { object } Object with prover name, hash proof and trusted authority digital signature
 */
const generateProvingKit = (name, secretSeed, privateKey) => {}

/**
 * Prover creates a proof for the verifier
 *
 * @param { number } age Age of prover
 * @param { number } ageToProve Age to prove required by verifier
 * @param { string } secretSeed Unique secret seed for prover
 * @return { string } SHA256 hash
 */
const generateProof = (age, ageToProve, secretSeed) => {}

/**
 * Verifier checks that the proving kit is genuine and prover is over a certain age
 *
 * @param { object } provingKit Object with prover name, hash proof and trusted authority digital signature
 * @param { string } proverProof SHA256 hash from prover
 * @param { number } ageToProve Age to prove required by verifier
 * @return { boolean }
 */
const verifyProof = (provingKit, proverProf, ageToProve) => {}

module.exports = {
  generateProvingKit,
  generateProof,
  verifyProof
}