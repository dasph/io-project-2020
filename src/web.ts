import * as Koa from 'koa'
import * as serve from 'koa-static'
import * as Router from 'koa-router'

const { NODE_ENV } = process.env

const main = new Router()

const prod = NODE_ENV === 'production'
const domain = prod ? 'https://ioproject.herokuapp.com' : 'http://192.168.0.2'

main
  .use(serve('./public'))
  .get('*', (ctx) => ctx.redirect(domain))

export default new Koa()
  .use(main.routes())
