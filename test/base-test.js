let positiveOutcome, failureCase, age, encryptedAge, proof, result

// age required to verify over
const requiredAge = 18

// positive outcome
//
//    in this case the number exceeds the treshold
//
positiveOutcome = () => {
  age = 21

  // ran by KYC Provider
  encryptedAge = encryptAge(age, seed)

  // ran by User
  proof = proveAge(age, requiredAge, seed)

  // ran by Service
  result = checkAge(encryptedAge, requiredAge, proof)

  console.log("Verifier test verifies that result is true, result: ", result)
}

failureCase = () -> {
  age = 21

  // ran by KYC Provider
  encryptedAge = encryptAge(age, seed)

  // ran by User
  proof = proveAge(age, requiredAge, seed)

  // ran by Service
  result = checkAge(encryptedAge, requiredAge, proof)

  condition = result === encryptedAge 

  console.log("Verifier test verifies that result is false, result: ", result)
}

positiveOutcome()

failureCase()
