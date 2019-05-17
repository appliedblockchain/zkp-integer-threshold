const errorHandler = async (_, next) => {
  try {
    await next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = errorHandler