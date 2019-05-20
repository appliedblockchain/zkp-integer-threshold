const crypto = require('crypto')

async function generateKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('ec', {
      namedCurve: 'secp256k1',
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    }, (error, publicKey, privateKey) => {
      if (error) {
        reject(error)
        return
      }

      resolve({
        publicKey: publicKey.toString('hex'),
        privateKey: privateKey.toString('hex')
      })
    })
  })
}

function sign(data, privateKey) {
  const s = crypto.createSign('SHA256')
  s.update(data)
  s.end()

  const signature = s.sign(privateKey, 'hex')
  return signature
}

function generateSecret() {
  return crypto.randomBytes(32)
}

module.exports = {
  generateKeyPair,
  sign,
  generateSecret
}
