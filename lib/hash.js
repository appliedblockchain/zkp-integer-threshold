const { createHash } = require('crypto')

const sha256 = () => (createHash('sha256')) // require('sha256') for Node < 10

const hash = (data) => {
  const sha = sha256()
  sha.update(data.toString())
  return sha.digest()
}

module.exports = hash
