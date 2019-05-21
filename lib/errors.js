const capitalize = (s) => {
  if (typeof s !== 'string') {
    return ''
  }

  return s.charAt(0).toUpperCase() + s.slice(1)
}

class NullFieldError extends Error {
  constructor(field) {
    super()
    this.field = capitalize(field)
  }

  get message() {
    return `${this.field} is null - please specify`
  }
}

module.exports = { NullFieldError }
