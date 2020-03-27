import * as Koa from 'koa'
import * as send from 'koa-send'
import * as serve from 'koa-static'
import * as Router from 'koa-router'

const main = new Router()

main
  .use(serve('./public'))
  .get(['/login', '/signup', '/recover', '/pricing', '/about', '/contact'], (ctx) => send(ctx, 'public/index.html'))
  .get('*', (ctx) => ctx.redirect('/'))

export const App = new Koa().use(main.routes())
export const Http = new Koa().use((ctx) => ctx.redirect(`https://${ctx.request.host}`))
