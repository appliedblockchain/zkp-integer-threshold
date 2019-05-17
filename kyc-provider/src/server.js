const koa = require('koa')
const koaRouter = require('koa-joi-router')
const packageJson = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const config = require('config')
const Joi = koaRouter.Joi
const zkp = require('zkp')
const crypto = require('crypto')
const { sign, verify } = require('./utils/crypto')
const apiKeys = require('./utils/apiKeys')

const router = koaRouter()

const user = {
  name: 'Paula',
  age: 21,
  seed: crypto.randomBytes(32)
}

const routes = [
  {
    method: 'get',
    path: '/',
    handler: async ctx => {
      ctx.body = {
        version: packageJson.version,
        publicKey: config.publicKey
      }
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
        encryptedAge: zkp.toHex(zkp.encryptInteger(user.age, user.seed)),
        signature: sign(user.name, apiKeys.privateKey)
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

      ctx.body = verified
    }
  }
]

router.route(routes)

const app = new koa()
app
  .use(errorHandler)
  .use(router.middleware())

app.listen(3000)
