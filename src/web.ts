import * as Koa from 'koa'
import * as send from 'koa-send'
import * as cors from '@koa/cors'
import * as serve from 'koa-static'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { Domain } from './koa-domain'
import { onSignup, onConfirm, onLogin } from './service'

const { NODE_ENV, DOMAIN } = process.env

const prod = NODE_ENV === 'production'

const redir: Koa.Middleware = (ctx, next) => {
  return (!prod || ctx.request.host.indexOf(DOMAIN || '') !== -1) ? next() : ctx.redirect(`https://${DOMAIN}`)
}

const main = new Router()
  .use(serve('./public'))
  .get('*', (ctx) => send(ctx, 'public/index.html'))

const api = new Router()
  .use(cors())
  .use(bodyParser())
  .post('/signup', onSignup)
  .post('/confirm', onConfirm)
  .post('/login', onLogin)
  .all('*', (ctx) => ctx.throw(405))

const domain = new Domain()
  .use('', main.routes())
  .use('api', api.routes())
  .use('dashboard', main.routes())

export default new Koa()
  .use(redir)
  .use(domain.routes())
  .use((ctx) => ctx.redirect(`https://${DOMAIN}`))
  .callback()
