const {
  encryptInteger,
  genIntegerProof,
  verifyIntegerProof,
  genSecret
} = require('..')

const threshold = 18
const secret = genSecret().toString('hex')
const fakeAgeLow = 17
const fakeAgeHigh = 19

describe('genIntegerProof()', () => {
  it('throws an error if supplying an age lower than the threshold', () => {
    expect(() => {
      genIntegerProof(fakeAgeLow, threshold, secret)
    }).toThrow(`Age cannot be less than ${threshold}`)
  })
})

describe('ZKP workflow', () => {
  describe('User age is above threshold', () => {
    const age = 21

    it('verifies successfully', () => {
      const encryptedInteger = encryptInteger(age, secret)
      const proof = genIntegerProof(age, threshold, secret)
      const verifyProof = verifyIntegerProof(proof, threshold)

      expect(encryptedInteger).toEqual(verifyProof)
    })

    it('does not verify if supplying an age that does not match the user age to `genIntegerProof`', () => {
      const encryptedInteger = encryptInteger(age, secret)
      const proof = genIntegerProof(fakeAgeHigh, threshold, secret)
      const verifyProof = verifyIntegerProof(proof, threshold)

      expect(encryptedInteger).not.toEqual(verifyProof)
    })
  })

  describe('User age is equal to the threshold', () => {
    const age = 18

    it('verifies successfully', () => {
      const encryptedInteger = encryptInteger(age, secret)
      const proof = genIntegerProof(age, threshold, secret)
      const verifyProof = verifyIntegerProof(proof, threshold)

      expect(encryptedInteger).toEqual(verifyProof)
    })

    it('does not verify if supplying an age that does not match the user age to `genIntegerProof`', () => {
      const encryptedInteger = encryptInteger(age, secret)
      const proof = genIntegerProof(fakeAgeHigh, threshold, secret)
      const verifyProof = verifyIntegerProof(proof, threshold)

      expect(encryptedInteger).not.toEqual(verifyProof)
    })
  })

  describe('User age is below the threshold', () => {
    const age = 17

    it('Does not verify if supplying a secret as proof', () => {
      const encryptedInteger = encryptInteger(age, secret)
      const verifyProof = verifyIntegerProof(secret, threshold)
      expect(encryptedInteger).not.toEqual(verifyProof)
    })
  })
})
