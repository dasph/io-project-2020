import * as http2 from 'http2'
import { readFileSync } from 'fs'

const { CERT_DIR } = process.env

function createSecureServer (callback?: Parameters<typeof http2.createSecureServer>[1]) {
  const options = ['ca', 'key', 'cert'].reduce((a, c) => ({ [c]: readFileSync(`${CERT_DIR}/${c}.pem`), ...a }), {})
  return http2.createSecureServer(options, callback)
}

export { createSecureServer }
export { createServer } from 'http'
