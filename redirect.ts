import * as Koa from 'koa'

const { DOMAIN } = process.env

new Koa()
  .use((ctx) => ctx.redirect(`https://${DOMAIN}`))
  .listen(80)
