const crypto = require('crypto')

function verify(data, signature, publicKey) {
  const v = crypto.createVerify('SHA256')
  v.update(data)
  v.end()

  const verified = v.verify(publicKey, signature, 'hex')
  return verified
}

module.exports = {
  verify
}
