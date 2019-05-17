# zkp-integer-threshold
WIP - Age Verification using ZKP Integer Threshold via Recursive Hashing


### Install

    npm i

<!-- or simply: `npm i -g sha256` - the only dependency required for the core -->


### Run

    npm start

or:

    node zkp-hash-range-example.js

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

This is the main "Demo" flow.

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

This is the core implementation of the proofs

```js
const { sha256 } = require('crypto')

const encryptAge = (age, seed) => {
  let h = seed
  for(let i=1; i<=(age+1); i++) {
    h = sha256(h)
  }
  return h
}

const proveAge = (age, ageToProve, seed) => {
  const p = (1 + age - ageToProve)
  let h = seed
  for(let i=1; i<=p; i++) {
    h = sha256(h)
  }
  return h
}

const verifyAge = (proof, ageToProve) => {
  let h = proof
  for(let i=1; i<=ageToProve; i++) {
    h = sha256(h)
  }
  return h
}

module.exports = {
  encryptAge,
  proveAge,
  verifyAge,
}```
