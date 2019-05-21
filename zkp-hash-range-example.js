'use strict'

const {
  encryptInteger,
  genIntegerProof,
  verifyIntegerProof
} = require('./zkp')

const { NullFieldError } = require('./lib/errors.js')
const inquirer = require('inquirer')
const wait = require('./lib/wait')
const promptNext = require('./lib/promptNext')

const genSeed = require('./lib/genSeed')
const formatHex = require('./lib/formatHex')

const main = async () => {

  genSeed()

  let age = await inquirer.prompt({
    message: 'Enter your Age',
    name: 'age',
    type: 'input',
    default: '21'
  })

  if (!age.age) {
    throw new NullFieldError('Age')
  }

  console.log('User: ', age, '\n')
  age = new Number(age.age)

  await promptNext('Welcome in my motorbike shop, you are buying a motorbike for 2k...', inquirer)
  await wait(200)

  console.log('You\'ll have to prove that you\'re over 18 to complete the purchase.\n')
  await wait(200)

  await promptNext('> Select Bike: "GS200 600cc"', inquirer)

  await promptNext('> Button: [Buy]', inquirer)

  await promptNext('> Button: [Auth with Nuggets]', inquirer)

  console.log('I open the Nuggets App...\n')
  await wait(200)

  await promptNext('I see I\'m logged in, I see a notification "New proof request"', inquirer)

  await promptNext('"Generate Send Proof" (Website details: "motorbike shop")', inquirer)

  await promptNext('> Button: [Generate and Send Proof]', inquirer)

  console.log('...')
  await wait(200)

  console.log('Contacting KYC server for secret...\n')
  await wait(200)


  // ran by Service:

  console.log('Secret Received\n')
  await wait(200)

  const seed = genSeed()
  console.log(`Seed (secret): ${formatHex(seed)}\n`)
  await wait(200)

  console.log('Encrypting age...')
  await wait(200)

  const encryptedAge = encryptInteger(age, seed)

  console.log(`Age Encrypted: ${formatHex(encryptedAge)}\n`)
  await wait(200)

  console.log('Encrypted age Sent alongside Digital Signature and timestamp from provider\n')
  await wait(200)


  // ran by User:

  console.log('Generating proof...')
  await wait(200)

  const requiredAge = 18 // age treshold

  const proof = genIntegerProof(age, requiredAge, seed)

  console.log(`Proof: ${formatHex(proof)}`)
  await wait(200)

  console.log('Proof generated and sent!\n')
  await wait(200)


  // ran by Service:

  const verification = verifyIntegerProof(proof, requiredAge)

  console.log(`Age verification challenge result: ${formatHex(verification)} \n\n`)

  console.log('VERIFICATION:')
  if (encryptedAge.equals(verification)) {
    console.log('You have proven your age, you can continue with the purchase.\n')
  } else {
    console.log('You cannot complete the purchase, age verification failed.\n')
  }

}

;(async () => {

  try {
    await main()
  } catch (error) {
    console.log('ERROR:')
    console.log(error)
  }

})()
