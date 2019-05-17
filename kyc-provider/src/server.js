const koa = require('koa')
const koaRouter = require('koa-joi-router')
const { version } = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const Joi = koaRouter.Joi
const zkp = require('zkp')
const crypto = require('crypto')
const { sign, verify } = require('./utils/crypto')
const apiKeys = require('./utils/apiKeys')

const router = koaRouter()

const user = {
  name: 'Paula',
  age: 21,
  secret: crypto.randomBytes(32)
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
      const provingKit = {
        user: {
          name: user.name,
          publicKey: user.publicKey
        },
        encryptedAge: zkp.encryptInteger(user.age, user.secret),
        signature: sign(user.name, apiKeys.privateKey) // TODO: Sign message should check the encrypted age
      }

      ctx.body = provingKit
    }
  },
  {
    method: 'get',
    path: '/verify',
    validate: {
      query: {
        msg: Joi.string().required(),
        signature: Joi.string().required()
      }
    },
    handler: async ctx => {
      const { msg, signature } = ctx.request.query

      const verified = verify(msg, signature, apiKeys.publicKey)

      ctx.body = !!(verified)
    }
  }
]

router.route(routes)

const app = new koa()
app
  .use(errorHandler)
  .use(router.middleware())

app.listen(3000)
