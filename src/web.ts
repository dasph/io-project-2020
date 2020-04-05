import * as Koa from 'koa'
import * as send from 'koa-send'
import * as serve from 'koa-static'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { Domain } from './koa-domain'

const { NODE_ENV, DOMAIN } = process.env

const prod = NODE_ENV === 'production'

const redir: Koa.Middleware = (ctx, next) => {
  return (!prod || ctx.request.host.indexOf(DOMAIN || '') !== -1) ? next() : ctx.redirect(`https://${DOMAIN}`)
}

const main = new Router()
const api = new Router()

main
  .use(serve('./public'))
  .get(['/login', '/signup', '/recover', '/pricing', '/about', '/contact'], (ctx) => send(ctx, 'public/index.html'))
  .all('*', (ctx) => ctx.redirect('/'))

api
  .use(bodyParser())
  .get('/login', (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = 'kek'
  })
  .all('*', (ctx) => ctx.throw(405))

const domain = new Domain()

domain
  .use('', main.routes())
  .use('api', api.routes())

export default new Koa()
  .use(redir)
  .use(domain.routes())
  .use((ctx) => ctx.redirect(`https://${DOMAIN}`))
  .callback()
