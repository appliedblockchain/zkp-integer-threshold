const axios = require('axios')
const zkp = require('./zkp')
const kycProviderUrl = 'http://localhost:8000'
const verifierUrl = 'http://localhost:8001'

const validCase = async () => {
  console.log('===== VALID CASE =====')
  console.log('Retrieving proving kit from kyc provider...\n')
  const { data } = await axios.get(`${kycProviderUrl}/proving-kit`)
  const { user, encryptedAge, signature } = data

  console.log(`Proving kit details:\n${JSON.stringify(data, null, 2)}\n`)

  console.log('Generating proof...\n')
  const proof = zkp.genIntegerProof(21, 18, user.secret)
  console.log(`Proof generated: ${proof}\n`)

  console.log('Verifying proof with store...\n')
  const { data: verified } = await axios.get(`${verifierUrl}/verify?msg=${user.name}&proof=${proof}&signature=${signature}&encryptedAge=${encryptedAge}`)
  console.log(`Valid proof: ${verified}\n`)
}

const invalidCase = async () => {
  console.log('===== INVALID CASE =====')
  console.log('Retrieving proving kit from kyc provider...\n')
  const { data } = await axios.get(`${kycProviderUrl}/proving-kit`)
  const { user, encryptedAge, signature } = data

  console.log(`Proving kit details:\n${JSON.stringify(data, null, 2)}\n`)

  console.log('Generating proof...\n')
  const proof = zkp.genIntegerProof(19, 18, user.secret)
  console.log(`Proof generated: ${proof}\n`)

  console.log('Verifying proof with store...\n')
  const { data: verified } = await axios.get(`${verifierUrl}/verify?msg=${user.name}&proof=${proof}&signature=${signature}&encryptedAge=${encryptedAge}`)
  console.log(`Valid proof: ${verified}\n`)
}

;(async () => {
  await validCase()
  await invalidCase()
})()
