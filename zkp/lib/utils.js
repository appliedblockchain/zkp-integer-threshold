const { createHash } = require('crypto')

const newArray = integer => (
  integer > 0 ? Array(integer) : []
)

const sha256Hash = data => (
  createHash('sha256')
    .update(data)
    .digest('hex')
)

const hashTimes = (integer, initialData, hash = sha256Hash) => (
  [ ...newArray(integer) ]
    .reduce((data) => (
      hash(data)
    ), initialData)
)

module.exports = {
  hashTimes,
  sha256Hash
}
