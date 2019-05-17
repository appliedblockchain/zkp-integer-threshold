const axios = require('axios')
const koa = require('koa')
const koaRouter = require('koa-joi-router')
const package = require('../package.json')
const errorHandler = require('./middleware/error-handler')
const Joi = koaRouter.Joi

const router = koaRouter()
const url = 'http://localhost:3000'

const routes = [
  {
    method: 'get',
    path: '/',
    handler: async ctx => {
      ctx.body = {
        version: package.version
      }      
    }
  },
  {
    method: 'get',
    path: '/verify',
    validate: {
      query: {
        msg: Joi.string().required(),
        signature: Joi.string().required(),
        proof: Joi.string().required()
      }
    },
    handler: async ctx => {
      const { msg, signature, proof } = ctx.request.query
      const { data: verified } = await axios.get(`${url}/verify?msg=${msg}&signature=${signature}`)

      if (!verified) {
        ctx.status = 400
        ctx.body = 'Bad request'
        return
      }
      
      // zkp.verifyProof(proof, requiredAge)

      ctx.body = 'success'
    }
  }
]

router.route(routes)

const app = new koa()
app 
  .use(errorHandler)
  .use(router.middleware())

app.listen(8000)