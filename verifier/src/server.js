const axios = require('axios')
const koa = require('koa')
const koaRouter = require('koa-joi-router')
const cors = require('@koa/cors')
const { version } = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const zkp = require('zkp')
const Joi = koaRouter.Joi

const router = koaRouter()
const url = 'http://localhost:8000'
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
        signedProvingKit: Joi.string().required(),
        proof: Joi.string().required()
      }
    },
    handler: async ctx => {
      const { signedProvingKit, proof } = ctx.request.query

      try {
        const { data } = await axios.get(`${url}/verify?signature=${signedProvingKit}`)

        const verificationProof = zkp.verifyIntegerProof(proof, requiredAge)

        ctx.body = data.encryptedAge === verificationProof
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
