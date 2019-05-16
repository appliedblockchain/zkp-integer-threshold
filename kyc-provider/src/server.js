const koa = require('koa')
const koaRouter = require('koa-joi-router')
const package = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const Mantle = require('@appliedblockchain/mantle')
const mantle = require('./utils/mantle')
const config = require('config')
const Joi = koaRouter.Joi

const router = koaRouter()

const users = {
  paula: {
    name: 'Paula',
    age: 21,
    publicKey: '0x123'
  }
}

const routes = [
  {
    method: 'get',
    path: '/',
    handler: async ctx => {
      ctx.body = {
        version: package.version,
        publicKey: config.publicKey
      }      
    }
  },
  {
    method: 'get',
    path: '/proving-kit',
    validate: {
      query: {
        user: Joi.string().required(),
        signature: Joi.string().required()
      }
    },
    handler: async ctx => {
      const { user, signature } = ctx.request.query
      const dbUser = users[user]

      if (!dbUser) {
        ctx.status = 404
        ctx.body = 'No user found'
        return 
      }

      // const isValidSignature = Zkp.verifySignature(signature, dbUser.publicKey)
      // const hashedData = Zkp.hash(dbUser)
      // ctx.body = {
      //   signature: appSignature,
      //   data: hashedData
      // }
      ctx.body = 'success'
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

      const hash = Mantle.generateHash(msg)
      const signedMsg = Mantle.sign(hash, mantle.privateKey)
      const validSignature = signature === signedMsg

      ctx.body = validSignature
    }
  }
]

router.route(routes)

const app = new koa()
app 
  .use(errorHandler)
  .use(router.middleware())

app.listen(3000)