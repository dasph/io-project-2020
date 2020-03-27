import { createServer } from 'https'
import { readFileSync } from 'fs'
import { App, Http } from './src/web'

const { CERT_DIR } = process.env

const opts = {
  key: readFileSync(`${CERT_DIR}/private.key`),
  cert: readFileSync(`${CERT_DIR}/certificate.crt`)
}

createServer(opts, App.callback()).listen(443)

App.listen(443, () => console.log('Ξ Binded app @443'))
Http.listen(80, () => console.log('Ξ Binded app @80'))
