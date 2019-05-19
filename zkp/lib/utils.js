const { createHash } = require('crypto')

const newArray = (integer) => (
  integer > 0 ? Array(integer) : []
)

const hashTimes = (integer, initialData, hash) => (
  [...newArray(integer)]
    .reduce((data) => (
      hash(data)
    ), initialData)
)

const sha256Hash = (data) => {
  const sha = createHash('sha256')
  sha.update(data)
  return sha.digest()
}

module.exports = {
  hashTimes,
  sha256Hash,
}
