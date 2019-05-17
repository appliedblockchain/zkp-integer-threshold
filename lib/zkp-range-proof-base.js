
const secret = randomBytes(32)

const hash = () => {} // ...require('crypto') - sha256 ...

// number  = 4
// treshold = 2

const encryptedAge = hash(hash(hash(hash(secret)))) // number + 1 times hash()

const proof = hash(secret) // hash once

const verifiedAge = hash(hash(hash(proof))) // 4 - 2 + 1 // treshold - number + 1

const ageCheck = -> { encryptedAge === verifiedAge }

ageCheck()


//

const opReturn = require('op-return')

const number   = 4
const treshold = 2

const encryptAgeTxId = await opReturn( hash(number+1)(secret)))) )

const proofTxId = await opReturn( hash(secret) )

const proofTxId = await opReturn( hash(secret) )
