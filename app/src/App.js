import React, { useState } from 'react'
import axios from 'axios'
import zkp from 'zkp'
import './App.css'

const App = () => {
  const [ verified, setVerified ] = useState(false)
  const [ provingKit, setProvingKit ] = useState('')
  const [ proof, setProof ] = useState('')

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
  }

  const requestProvingKit = async () => {
    const proceed = window.confirm('Request proving kit from KYC provider?')

    if (!proceed) {
      return
    }

    const { data } = await axios.get('http://localhost:8000/proving-kit')
    setProvingKit(data)
  } 

  const generateProof = () => {
    const age = window.prompt('Please enter your age')

    if (!age) {
      return window.alert('No age provided: proof calculation aborted')
    }

    const proof = zkp.genIntegerProof(age, 18, provingKit.secret)
    setProof(proof)
  }

  const verifyProof = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8001/verify?signedProvingKit=${provingKit.signedProvingKit}&proof=${proof}`)

      if (!data) {
        throw new Error('Invalid proof')
      }

      setVerified(true)
      window.alert('Age verified')
    } catch (error) {
      if (error.response && error.response.data) {
        return window.alert(error.response.data)
      }

      window.alert(error)
    }
  }

  return (
    <div className="App">
      <div className="Header">
        <div className="title">
          BIKE SHOP
        </div>
      </div>
      <div className="Main">
        <div className="optionsContainer">
          <button onClick={requestProvingKit} className="button">REQUEST PROVING KIT</button>
          <button onClick={purchase} className="button">PURCHASE BIKE</button>
        </div>

        { provingKit ? (
        <>
          <div className="container">
            <div className="containerTitle">PROVING KIT DETAILS</div>
            <div>Signed Proving Kit: <input onChange={e => setProvingKit({ ...provingKit, signedProvingKit: e.currentTarget.value })} value={provingKit.signedProvingKit} /></div>
            <div>Secret: <input onChange={e => setProvingKit({ ...provingKit, secret: e.currentTarget.value })} value={provingKit.secret} /></div>
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
    </div>
  )
}

export default App
