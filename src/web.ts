import * as Koa from 'koa'
import * as serve from 'koa-static'
import * as Router from 'koa-router'

const main = new Router()

main
  .use(serve('./public'))
  .get('*', (ctx) => ctx.redirect('/'))

export default new Koa()
  .use(main.routes())
