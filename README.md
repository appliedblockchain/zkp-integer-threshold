# zkp-integer-threshold

There are Snarks and other way to build other ZKP consructs. 

This is an example using a ZKP integer treshold hashchain as the one described in the VEX paper: https://cs.nyu.edu/~mwalfish/papers/vex-sigcomm13.pdf even if we're applying in this example repository for purposes like `"age verification"` (prove that a user is over a certain age), or `"credit line(s) value in thousandUSDs"` or other similar ones.


### Install

    npm i

<!-- even if the core SDK/module shouldn't require any third party deps (only node 10+) -->


### Run

    npm start

or:

    node zkp-hash-range-example.js
    

#### Underliying principle:

TLDR; Age Difference is "hidden" in the proof. ok, now skip to implementation :D

An entity encodes a value V in the length of a hash chain and commits to the
value by exposing the tail of the hash chain; later, given a query Q,
the entity can prove that V ≥ Q (without disclosing V), by revealing
an appropriate node in the hash chain

Paper: https://cs.nyu.edu/~mwalfish/papers/vex-sigcomm13.pdf

 https://stratumn.com/uploads/zkp-hash-chains-2.png

https://stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/


#### Implementation

This is the core implementation of the proofs

```js
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
