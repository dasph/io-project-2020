import * as Koa from './koa'
import * as send from 'koa-send'
import * as serve from 'koa-static'
import * as Router from 'koa-router'

const { NODE_ENV, DOMAIN } = process.env

const prod = NODE_ENV === 'production'

const redir = (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next) => {
  return (!prod || ctx.request.host === DOMAIN) ? next() : ctx.redirect(`https://${DOMAIN}`)
}

const main = new Router()

main
  .use(serve('./public'))
  .get(['/login', '/signup', '/recover', '/pricing', '/about', '/contact'], (ctx) => send(ctx, 'public/index.html'))
  .get('*', (ctx) => ctx.redirect('/'))

export default new Koa()
  .use(redir)
  .use(main.routes())
