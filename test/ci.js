const requiredAge = 18
const age = 21

const encryptedAge = encryptAge(age, seed)

// ran by
const proof  = proveAge(age, requiredAge, seed)

// ran by Service
const result = checkAge(encryptedAge, requiredAge, proof)
console.log(result)
