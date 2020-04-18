import * as Koa from 'koa'

class Domain {
  subs: Array<Array<string>>
  middlewares: Array<Koa.Middleware<{}, any>>

  constructor () {
    this.subs = []
    this.middlewares = []
  }

  use (subdomain: string, router: Koa.Middleware<{}, any>) {
    const sub = subdomain ? subdomain.split('.').reverse() : []

    this.subs.push(sub)
    this.middlewares.push(router)

    return this
  }

  routes (): Koa.Middleware {
    return (ctx, next) => {
      const i = this.find(ctx.subdomains)
      return i === -1 ? next() : this.middlewares[i](ctx, next)
    }
  }

  find (subdomains: Array<string>) {
    return this.subs.findIndex((sub) => {
      return sub.length === subdomains.length && sub.every((s, i) => s === '*' || s === subdomains[i])
    })
  }
}

export { Domain }
