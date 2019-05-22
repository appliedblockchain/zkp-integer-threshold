import React, { useState } from 'react'
import ConfettiGenerator from "confetti-js"
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import zkp from 'zkp'
import './App.css'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  input: {
    color: '#fff'
  },
  inputLabel: {
    color: '#fff'
  },
  notchedOutline: {
    borderColor: '#f50057 !important'
  },
  button: {
    margin: theme.spacing.unit,
  }
})

const App = ({ classes }) => {
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

    const proof = zkp.genIntegerProof(Number(age), 18, secret)
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
            <Button onClick={requestProvingKit} variant="contained" color="secondary" className={classes.button}>
              REQUEST PROVING KIT
            </Button>
            <Button onClick={purchase} variant="contained" color="secondary" className={classes.button}>
              PURCHASE BIKE
            </Button>
          </div>

          { provingKit ? (
          <>
            <div className="container">
              <div className="containerTitle">PROVING KIT DETAILS</div>
              <div>Proving Kit: {JSON.stringify(provingKit, null, 4)}</div>
              <div className="row">
                Signature:
                <TextField
                  id="signature"
                  label="Signature"
                  className={classes.textField}
                  value={signature}
                  onChange={e => setSignature(e.currentTarget.value)}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    classes: { notchedOutline: classes.notchedOutline, root: classes.input },
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.inputLabel
                  }}
                />
              </div>
              <div className="row">
                Secret:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                  id="secret"
                  label="Secret"
                  className={classes.textField}
                  value={secret}
                  onChange={e => setSecret(e.currentTarget.value)}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    classes: { notchedOutline: classes.notchedOutline },
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.inputLabel
                  }}
                />
              </div>
            </div>

            <div className="optionsContainer">
              <Button onClick={generateProof} variant="contained" color="secondary" className={classes.button}>
                GENERATE PROOF
              </Button>
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
            <Button onClick={verifyProof} variant="contained" color="secondary" className={classes.button}>
              VERIFY PROOF
            </Button>
          </div>
        </>
        ): null }
        </div>
        )}
      </div>
    </>
  )
}

export default withStyles(styles)(App)
