const koa = require('koa')
const koaRouter = require('koa-joi-router')
const cors = require('@koa/cors')
const { version } = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const Joi = koaRouter.Joi
const zkp = require('zkp')
const crypto = require('crypto')
const { sign, verify } = require('./utils/crypto')
const apiKeys = require('./utils/apiKeys')

const router = koaRouter()

const user = {
  name: 'ZKP User',
  age: 21,
  secret: crypto.randomBytes(32).toString('hex')
}

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
    path: '/proving-kit',
    handler: async ctx => {
      const { name, age, secret } = user

      const provingKit = zkp.generateProvingKit(name, secret, age)

      const signedProvingKit = sign(JSON.stringify(provingKit), apiKeys.privateKey)

      ctx.body = { signedProvingKit, secret }
    }
  },
  {
    method: 'get',
    path: '/verify',
    validate: {
      query: {
        signature: Joi.string().required()
      }
    },
    handler: async ctx => {
      const { signature } = ctx.request.query
      const provingKit = zkp.generateProvingKit(user.name, user.secret, user.age)

      const verified = verify(JSON.stringify(provingKit), signature, apiKeys.publicKey)

      if (!verified) {
        ctx.status = 401
        ctx.body = 'Invalid signature'
        return
      }

      ctx.body = provingKit
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

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
