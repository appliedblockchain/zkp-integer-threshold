# zkp-hash-range-js
WIP - ZKP Hash Range for Range Verification ZKPs using hashes


Paper: https://cs.nyu.edu/~mwalfish/papers/vex-sigcomm13.pdf

#### Underliying principle:

an entity encodes a value V in the length of a hash chain and commits to the
value by exposing the tail of the hash chain; later, given a query Q,
the entity can prove that V ≥ Q (without disclosing V), by revealing
an appropriate node in the hash chain

This example: https://stratumn.com/uploads/zkp-hash-chains-2.png
https://stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/

#### Parties:

KYC - Trusted Authority - Government or KYC Provider

User - Paula - Prover - User / Client

Service - Milena - Verifier - Service Provider (Bike service provider / Gambling platform, etc.)

---

#### Happy Path:

The Service sends the User a challenge: “Prove you are at least 18”

The User sends the Service the response: 90d17d7dcd91b4cd4a3e740c15cabac368e32381f68f9d221b7135d38a6845a7

The Service verifies the response is correct: “Ok, I am convinced”

----

#### Setup:

User is registered with KYC provider (provider has ID details of User)

mobile-app.js (User)
```js
KYC.register()
```

User asks KYC provider for a secret (hash seed)

mobile-app.js (User)
```js
KYC.requestSecret()
```

KYC provider is able to provide a secret to User

provider-api.js
```js
API.on("POST /secrets", (ctx) => {
  ctx.res(200, { seed: seed })
})
```

KYC provider calculates the `encryptedAge`

provider-process.js
```js
encryptedAge = ZKP.encryptAge(age, seed)
```

KYC Provider sends Client a "Proving Kit"

– user name in plaintext
– A timestamp
– Paula’s EncryptedAge

```js
{
  user: {
    id: 123,
    username: "Jhon Doe #123",
  },
  timestamp: 1557849798,
  encryptedAge: "012030120301230012031203010203012300123012030"
}
```

#### Challenge

User, who is 21, receives Service Provider request to prove she is at least 18 years of age (The AgeToProve)

mobile-app.js (User)
```js
ZKP.createProof()
```

mobile-app.js (User)
```js
KYC.requestSecret()
```

mobile-app.js (User)
```js
KYC.requestSecret()

ZKP.generateProofProveAge()
```

#### Implementation


```js
ZKP = {}
ZKP.encryptAge = () => {
  encryptAge()
}
ZKP.createProof = () => {
  proveAge()
}
ZKP.generateProofProveAge = () => {

}

export default EKP
```

```js
KYC = {}

// this function is called from the
KYC.requestSecret = () => {

}
```
