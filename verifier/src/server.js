const axios = require('axios')
const koa = require('koa')
const koaRouter = require('koa-joi-router')
const { version } = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const zkp = require('zkp')
const Joi = koaRouter.Joi

const router = koaRouter()
const url = 'http://localhost:3000'
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
        msg: Joi.string().required(),
        signature: Joi.string().required(),
        proof: Joi.string().required(),
        encryptedAge: Joi.string().required()
      }
    },
    handler: async ctx => {
      const { msg, signature, proof, encryptedAge } = ctx.request.query
      const { data: validSignature } = await axios.get(`${url}/verify?msg=${msg}&signature=${signature}`)

      if (!validSignature) {
        ctx.status = 400
        ctx.body = 'Invalid signature'
        return
      }

      const verificationProof = zkp.verifyIntegerProof(proof, requiredAge)

      ctx.body = encryptedAge === verificationProof
    }
  }
]

router.route(routes)

const app = new koa()
app
  .use(errorHandler)
  .use(router.middleware())

const PORT = process.env.PORT || 8001
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
