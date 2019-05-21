const koa = require('koa')
const koaRouter = require('koa-joi-router')
const cors = require('@koa/cors')
const { version } = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const zkp = require('zkp')
const crypto = require('crypto')
const { sign } = require('./utils/crypto')
const apiKeys = require('./utils/apiKeys')

const router = koaRouter()

const user = {
  name: 'ZKP User',
  id: 1,
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
      const { id, age, secret } = user

      const provingKit = zkp.generateProvingKit(id, secret, age)

      const signature = sign(JSON.stringify(provingKit), apiKeys.privateKey)

      ctx.body = { provingKit, signature, secret }
    }
  },
  {
    method: 'get',
    path: '/public-key',
    handler: async ctx => {
      ctx.body = apiKeys.publicKey
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
