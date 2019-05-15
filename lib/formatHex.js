const formatHex = (buffer) => (
  buffer.toString('hex').replace(/^0+/, '')
)

module.exports = formatHex
