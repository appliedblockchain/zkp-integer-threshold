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
