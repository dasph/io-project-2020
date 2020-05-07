import * as Koa from 'koa'
import * as send from 'koa-send'
import * as cors from '@koa/cors'
import * as serve from 'koa-static'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { Domain } from './koa-domain'
import { onSignup, onConfirm, onLogin, authorize, isAdmin, onGetUserRes, onGetRooms, onPostRoomReq, onGetRoomReq, onPutRoomReq } from './service'

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

  .get('/userRes', authorize, onGetUserRes)
  .get('/rooms/:floor', authorize, onGetRooms)
  .post('/roomReq', authorize, onPostRoomReq)

  .get('/roomReq', authorize, isAdmin, onGetRoomReq)
  .put('/roomReq', authorize, isAdmin, onPutRoomReq)

  .all('*', (ctx) => ctx.throw(405))

const domain = new Domain()
  .use('', main.routes())
  .use('api', api.routes())

export default new Koa()
  .use(redir)
  .use(domain.routes())
  .use((ctx) => ctx.redirect(`https://${DOMAIN}`))
  .callback()
