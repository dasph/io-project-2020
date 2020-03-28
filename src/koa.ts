import * as Koa from 'koa'
import { readFileSync } from 'fs'
import { createServer } from 'https'

const { NODE_ENV, CERT_DIR } = process.env

if (NODE_ENV === 'production') {
  const options = ['ca', 'key', 'cert'].reduce((a, c) => ({ [c]: readFileSync(`${CERT_DIR}/${c}.pem`), ...a }), {})

  Koa.prototype.listen = function (...args: any) {
    return createServer(options, this.callback()).listen(...args)
  }
}

export = Koa
