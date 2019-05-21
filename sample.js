const axios = require('axios')
const zkp = require('./zkp')
const kycProviderUrl = 'http://localhost:8000'
const verifierUrl = 'http://localhost:8001'

const validCase = async () => {
  console.log('===== VALID CASE =====')
  console.log('Retrieving proving kit from kyc provider...\n')
  const { data: { provingKit, signature, secret } } = await axios.get(`${kycProviderUrl}/proving-kit`)

  console.log(`Proving kit details:\n${JSON.stringify(provingKit, null, 4)}\n`)

  console.log('Generating proof...\n')
  const proof = zkp.genIntegerProof(21, 18, secret)
  console.log(`Proof generated: ${proof}\n`)

  console.log('Verifying proof with store...\n')
  const { data: verified } = await axios.get(`${verifierUrl}/verify?signature=${signature}&proof=${proof}&provingKit=${JSON.stringify(provingKit)}`)
  console.log(`Valid proof: ${verified}\n`)
}

const invalidCase = async () => {
  console.log('===== INVALID CASE =====')
  console.log('Retrieving proving kit from kyc provider...\n')
  const { data: { provingKit, signature, secret } } = await axios.get(`${kycProviderUrl}/proving-kit`)

  console.log(`Proving kit details:\n${JSON.stringify(provingKit, null, 4)}\n`)

  console.log('Generating proof...\n')
  const proof = zkp.genIntegerProof(17, 18, secret)
  console.log(`Proof generated: ${proof}\n`)

  console.log('Verifying proof with store...\n')
  const { data: verified } = await axios.get(`${verifierUrl}/verify?signature=${signature}&proof=${proof}&provingKit=${JSON.stringify(provingKit)}`)
  console.log(`Valid proof: ${verified}\n`)
}

  ;(async () => {
  await validCase()
  await invalidCase()
})()
