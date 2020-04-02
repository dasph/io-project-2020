import * as http2 from 'http2'
import { readFileSync } from 'fs'

const { CERT_DIR } = process.env

const createSecureServer = (callback?: Parameters<typeof http2.createSecureServer>[1], opts?: http2.SecureServerOptions) => {
  const certs = ['ca', 'key', 'cert'].reduce((a, c) => ({ [c]: readFileSync(`${CERT_DIR}/${c}.pem`), ...a }), {})
  return http2.createSecureServer({ ...opts, ...certs }, callback)
}

export { createSecureServer }
export { createServer } from 'http'
