# zkp-hash-range-js
WIP - ZKP Hash Range for Range Verification ZKPs using hashes


### Install

    npm i

<!-- or simply: `npm i -g sha256` - the only dependency required for the core -->


### Run

    npm start

or:

    node zkp-hash-range-example.js


### Implementation


Paper: https://cs.nyu.edu/~mwalfish/papers/vex-sigcomm13.pdf


Excerpt:

    an entity encodes a value V in the length of a hash chain and commits to the value by exposing the tail of the hash chain; later, given a query Q, the entity can prove that V ≥ Q (without disclosing V), by revealing an appropriate node in the hash chain



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
  const ageDifference = (1 + age - ageToProve)
  let h = seed
  for(let i=1; i<=ageDifference; i++) {
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
