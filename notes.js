
// Paper: https://cs.nyu.edu/~mwalfish/papers/vex-sigcomm13.pdf

// Underliying principle:
//
// an entity encodes a value V in the length of a hash chain and commits to the
// value by exposing the tail of the hash chain; later, given a query Q,
// the entity can prove that V ≥ Q (without disclosing V), by revealing
// an appropriate node in the hash chain

// This example: https://stratumn.com/uploads/zkp-hash-chains-2.png
// https://stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/

// Parties:
//
// KYC - Trusted Authority - Government or KYC Provider
//
// User - Paula - Prover - User / Client
//
// Service - Milena - Verifier - Service Provider (Bike service provider / Gambling platform, etc.)
//

// Milena sends Paula a challenge: “Prove you are at least 18”
//
// Paula sends Milena the response: 90d17d7dcd91b4cd4a3e740c15cabac368e32381f68f9d221b7135d38a6845a7
//
// Milena verifies the response is correct: “Ok, I am convinced”

// ----

// Setup:
// User is registered with KYC provider (provider has ID details of User)

// mobile-app.js (User)
//
// KYC.register()

// User asks KYC provider for a secret (hash seed)

// mobile-app.js (User)
//
// KYC.requestSecret()
//

// KYC provider is able to provide a secret to User

// provider-api.js
//
// API.on("POST /secrets", (ctx) => {
//   ctx.res(200, { seed: seed })
// })
//

// KYC provider calculates the `encryptedAge`

// provider-process.js
//
// encryptedAge = ZKP.encryptAge(age, seed)
//

// KYC Provider sends Client a "Proving Kit"
//
// – user name in plaintext
// – A timestamp
// – Paula’s EncryptedAge
//
//
// {
//   user: {
//     id: 123,
//     username: "Jhon Doe #123",
//   },
//   timestamp: 1557849798,
//   encryptedAge: "012030120301230012031203010203012300123012030"
// }
//

// Challenge
//
// User, who is 21, receives Service Provider request to prove she is at least 18 years of age (The AgeToProve)

// mobile-app.js (User)
//
// ZKP.createProof()
//

// mobile-app.js (User)
//
// KYC.requestSecret()
//

// 1) As Paula is eager to go for a ride on Milena’s tandem bicycle, she immediately calculates: Proof=HASH1+ActualAge−AgeToProve(S)=HASH2(S)
//
// In this case, Paula only calculates 2 links in the hash chain to get Proof: 4e1818b7cd1e72507c8ebf971f2bd8bbfa560a5cf84eef266b1e116ddaa0e6b8
//
// 2) Paula then sends Milena the following response:
// – The Authority’s signed Proving Kit (which contains her EncryptedAge)
// – The Proof she calculated

//
//
// ProofOfAge = HASH1 + ActualAge−AgeToProve(S) = HASH2(S)

// As Paula is eager to go for a ride on Milena’s tandem bicycle, she immediately calculates: Proof=HASH1+ActualAge−AgeToProve(S)=HASH2(S)



// https://stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/

// A trusted central document authority that provides proof services.
// P has requested a secret S from this authority, for use in proving her age. The authority assigns a secret (256 bit) S to P. Let’s say P's (S) is:
