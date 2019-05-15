'use strict'


const {
  encryptAge,
  proveAge,
  verifyAge,
} = require('./lib/zkp-range-proofs-age')


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
    default: '21',
  })

  if (!age.age) throw new NullFieldError("Age")
  console.log("User: ", age)
  age = new Number(age.age)

  await promptNext('Welcome in my motorbike shop, you bought a motorbike for 2k, prove that you\'re over 18 to buy a bike.', inquirer)

  await promptNext('> Select Bike: "GS500 600cc"', inquirer)

  await promptNext('> Button: [Buy]', inquirer)

  await promptNext('> Button: [Auth with Nuggets]', inquirer)

  console.log("I open the Nuggets App")
  await wait(300)

  // I open my phone and visit http://localhost:3000 / https://abdevs.eu.ngrok.io / https://mkvd.eu.ngrok.io

  await promptNext('I see I\'m logged in, I see a notification "New proof request"', inquirer)

  await promptNext('"Generate Send Proof" (Website details: "motorbike shop")', inquirer)

  await promptNext('> Button: [Generate and Send Proof]', inquirer)

  console.log("...")
  await wait(300)

  console.log("Contacting KYC server for secret\n")
  await wait(300)


  // ran by Service:

  console.log("Secret Received\n")
  await wait(300)

  const seed = genSeed()
  console.log(`Seed (secret): ${seed.toString('hex')}\n`)

  console.log("Encrypting age...")
  await wait(300)

  const encryptedAge = encryptAge(age, seed)

  console.log(`Age Encrypted: ${formatHex(encryptedAge)}\n`)

  console.log("Encrypted age Sent alongside Digital Signature and timestamp from provider\n")
  await wait(300)


  // ran by User:

  console.log("Generating proof...")
  await wait(300)

  const requiredAge = 18 // age treshold

  const proof = proveAge(age, requiredAge, seed)

  console.log(`Proof: ${formatHex(proof)}\n`)

  console.log("Proof generated and sent\n")
  await wait(300)


  // ran by Service:

  const verification = verifyAge(proof, requiredAge)

  console.log(`Age verification result: ${formatHex(verification)} \n\n`)

  if (encryptedAge.equals(verification)) {
    console.log("You have proven your age, you can continue with the purchase.\n")
  } else {
    console.log("You cannot complete the purchase, age verification failed.\n")
  }

}

;(async () => {

  try {
    await main()
  } catch (error) {
    console.log("ERROR:")
    console.log(error)
  }

})()
