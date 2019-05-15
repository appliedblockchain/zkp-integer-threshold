const { randomBytes } = require('crypto')

const genSeed = () => (
  Buffer.concat([ Buffer.alloc(16), randomBytes(16) ])
)

module.exports = genSeed
