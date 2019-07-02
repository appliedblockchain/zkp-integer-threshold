const axios = require('axios')
const koa = require('koa')
const koaRouter = require('koa-joi-router')
const cors = require('@koa/cors')
const { version } = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const { verify } = require('./utils/crypto')
const { web3 } = require('./utils/web3')
const zkp = require('zkp')
const Joi = koaRouter.Joi

const router = koaRouter()
const url = process.env.KYC_PROVIDER || 'http://localhost:8000'
const requiredAge = 18

const routes = [
  {
    method: 'get',
    path: '/',
    handler: async ctx => {
      ctx.body = { version }
    }
  },
  {
    method: 'get',
    path: '/verify',
    validate: {
      query: {
        signature: Joi.string().required(),
        provingKit: Joi.string().required(),
        proof: Joi.string().required()
      }
    },
    handler: async ctx => {
      const { provingKit, signature, proof } = ctx.request.query

      try {
        const { data: publicKey } = await axios.get(`${url}/public-key`)

        const validSignature = verify(provingKit, signature, publicKey)

        if (!validSignature) {
          ctx.status = 401
          ctx.body = 'Invalid signature'
          return
        }

        const verificationProof = zkp.verifyIntegerProof(proof, requiredAge)

        const { transactionHash } = JSON.parse(provingKit)

        const transaction = await web3.eth.getTransaction(transactionHash)

        // Remove `0x` prefix
        const encryptedAge = transaction.input.slice(2)

        ctx.body = encryptedAge === verificationProof
      } catch (error) {
        ctx.status = error.response.status
        ctx.body = error.response.data
      }
    }
  }
]

router.route(routes)

const app = new koa()
app
  .use(cors({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': [ 'GET', 'POST', 'PATCH', 'PUT', 'OPTIONS' ]
  }))
  .use(errorHandler)
  .use(router.middleware())

const PORT = process.env.PORT || 8001
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
