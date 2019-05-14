const { randomBytes, sha256 } = require('crypto')

const {
  encryptAge,
  proveAge,
  verifyAge,
} = require('./lib/zkp-range-proofs-age')


const ZKP = require('./lib/zkp')
const KYC = require('./lib/kyc')


// ---------


// CLI

// Enter your Age

// Age: 21

// Welcome in my motorbike shop, you bought a motorbike for 2k, prove that you're 18.

// > [Buy]

// > [Auth with Nuggets]

// > [Download Nuggets]

// I open my phone and visit http://localhost:3000 / https://abdevs.eu.ngrok.io / https://mkvd.eu.ngrok.io

// > [Auth with Nuggets]

// I push Auth with Nuggets

// I see I'm logged in

// I see a button "New proof request", "Generate Send Proof" (Website details: "motorbike shop")

// > [Generate and Send Proof]

// Contacting KYC server for secret

// Secret Received

// Generating proof...

// Generated proof 12341232323123123

// Are you sure you want to send the following proof?

// user: {
//   id: 123,
//   username: "Jhon Doe (#123)",
// },
// timestamp: 1557849798,
// encryptedAge: "012030120301230012031203010203012300123012030"

// > [Yes/No]

// I can now buy a motorbike.


// ---------


// KYC Provider

const requiredAge = 18
const age = 21

const seed = crypto.randomByh

const encryptedAge = encryptAge(age, seed)

// ran by
const proof  = proveAge(age, requiredAge, seed)

// ran by Service
const result = checkAge(encryptedAge, requiredAge, proof)
console.log(result)
