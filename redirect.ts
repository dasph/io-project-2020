import * as Koa from 'koa'
import * as serve from 'koa-static'

new Koa()
  .use(serve('./public'))
  // .use((ctx) => ctx.redirect('/'))
  .listen(80)
