const Koa = require('koa')
const { exec } = require('child_process')

const app = new Koa()

app.use((ctx) => {
  if (ctx.header['x-github-event'] !== 'push') return ctx.throw(400)

  const t = Date.now()

  exec('npm run deploy', (err, out, e) => {
    console.log(`${Date.now() - t}ms`, err, out, e)
  })

  ctx.body = 'OK'
}).listen(8080)
