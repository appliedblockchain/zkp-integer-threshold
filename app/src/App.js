import React, { useState } from 'react'
import ConfettiGenerator from "confetti-js"
import axios from 'axios'
import zkp from 'zkp'
import './App.css'

const App = () => {
  const [ verified, setVerified ] = useState(false)
  const [ provingKit, setProvingKit ] = useState('')
  const [ signature, setSignature ] = useState('')
  const [ secret, setSecret ] = useState('')
  const [ proof, setProof ] = useState('')
  const [ purchased, setPurchased ] = useState(false)

  const purchase = () => {
    if (!provingKit) {
      return window.alert('Age cannot be proved. Please request a proving kit')
    }

    if (!proof) {
      return window.alert('Age cannot be proved. Please generate a proof')
    }

    if (!verified) {
      return window.alert('Age not yet verified. Please verify proof')
    }

    window.alert('Purchase successful!')

    setPurchased(true)

    const confettiSettings = { target: 'my-canvas' }
    const confetti = new ConfettiGenerator(confettiSettings)
    confetti.render()
  }

  const requestProvingKit = async () => {
    const proceed = window.confirm('Request proving kit from KYC provider?')

    if (!proceed) {
      return
    }

    const { data } = await axios.get('http://localhost:8000/proving-kit')

    setProvingKit(data.provingKit)
    setSignature(data.signature)
    setSecret(data.secret)
  } 

  const generateProof = () => {
    const age = window.prompt('Please enter your age')

    if (!age) {
      return window.alert('No age provided: proof calculation aborted')
    }

    const proof = zkp.genIntegerProof(age, 18, secret)
    setProof(proof)
  }

  const verifyProof = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8001/verify?provingKit=${JSON.stringify(provingKit)}&proof=${proof}&signature=${signature}`)

      if (!data) {
        throw new Error('Invalid proof')
      }

      setVerified(true)
      window.alert('Age verified')
    } catch (error) {
      setVerified(false)
      if (error.response && error.response.data) {
        return window.alert(error.response.data)
      }

      window.alert(error)
    }
  }

  return (
    <>
      <canvas className="Confetti" id="my-canvas"></canvas>
      <div className="App">
        <div className="Header">
          <div className="title">
            BIKE SHOP
          </div>
        </div>
        { purchased ? null : (
          <div className="Main">
          <div className="optionsContainer">
            <button onClick={requestProvingKit} className="button">REQUEST PROVING KIT</button>
            <button onClick={purchase} className="button">PURCHASE BIKE</button>
          </div>

          { provingKit ? (
          <>
            <div className="container">
              <div className="containerTitle">PROVING KIT DETAILS</div>
              <div>Proving Kit: {JSON.stringify(provingKit, null, 4)}</div>
              <div>Signature: <input value={signature} onChange={e => setSignature(e.currentTarget.value)} /></div>
              <div>Secret: <input value={secret} onChange={e => setSecret(e.currentTarget.value)} /></div>
            </div>

            <div className="optionsContainer">
              <button onClick={generateProof} className="button">GENERATE PROOF</button>
            </div>
          </>
        ): null }

        { proof ? (
          <>
          <div className="container">
            <div className="containerTitle">PROOF DETAILS</div>
            <div>Proof: {proof}</div>
          </div>

          <div className="optionsContainer">
              <button onClick={verifyProof} className="button">VERIFY PROOF</button>
            </div>
        </>
        ): null }
        </div>
        )}
      </div>
    </>
  )
}

export default App
