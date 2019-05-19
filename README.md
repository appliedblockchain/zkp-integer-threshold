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



#### Implementation

This is the core implementation of the proofs:

```js
const { createHash, randomBytes } = require('crypto')
const { sha256Hash, hashTimes } = require('./lib/utils')

const genSecret = () => ( randomBytes(32) )

const encryptIntegerThreshold = (intThreshold, secret) => (
  hashTimes(intThreshold+1, secret, sha256Hash)
)

const genIntegerThresholdProof = (intThreshold, secretInt, secret) => {
  const integerDifference = intThreshold - secretInt + 1
  return hashTimes(integerDifference, secret, sha256Hash)
}

const verifyIntegerThreshold = (secretInt, proof) => (
  hashTimes(secretInt, proof, sha256Hash)
)
```

In this example, the KYC/Identity provider encryps the shared secret (`secret`) by hashing it `intThreshold + 1` times (`encryptedInt = encryptIntegerThreshold(...)`).
The User prepares a proof that hashes the secret value `secretInt`,  `intThreshold - secretInt + 1` times.
The verifier will then use the verification function to create a verification output to be compared against the `encryptedInt` one.


---

Contact the developers by opening an issue on the GitHub Repo

Applied Blockchain Devs
