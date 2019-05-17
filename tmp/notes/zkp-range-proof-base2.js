


const buf2hex = (buffer) => (
  Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
)

const hash = async (data) => (
  await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(data))
)

const message = "foo"

;(async () => {
  const hashOne = await hash(message)
  console.log(buf2hex(hashOne))

  const encryptInteger = async (secretInteger, secret) => (
    [...Array(secretInteger)].inject((value, acc) => {
      console.log(buf2hex(value))
      return await hash(value)
    }, hashOne)
  )
  await encryptInteger(4, "foo")
})()

// in node:
// const hash = () => {} // ...require('crypto') - sha256 ...

// const integer  = 3
// const threshold = 2
const secret = "foo"

const encryptedAge = hash(hash(hash(hash(secret)))) // hash integer + 1 times hash()

const ageProof = hash(hash(hash(secret))) // integer - threshold + 1, in this example: 3 - 2 + 1 times hash()

const verifyAge = hash(proof) // threshold times - 1 hash()

const ageCheck = () => { encryptedAge === verifiedAge }

ageCheck()


//

const opReturn = require('op-return')

const integer   = 4
const threshold = 2

const encryptAgeTxId = await opReturn( hash(integer+1)(secret)))) )

const proofTxId = await opReturn( hash(secret) )

const proofTxId = await opReturn( hash(secret) )
