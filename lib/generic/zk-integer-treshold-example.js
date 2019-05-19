const int = 9 // >= 7 will pass, < 7 will fail
const threshold = 7
const secret  = randomBytes(32)
const enc     = encryptIntegerThreshold(int, secret)
const proof   = proveIntegerThreshold(int, threshold, secret)
const verification = verifyIntegerThreshold(threshold, proof)
console.log(`enc:   ${enc.toString("hex")}\nverif: ${verification.toString("hex")}, proof: ${proof.toString("hex")}`)
const verified = enc.equals(verification)
console.log("verified: ", verified)