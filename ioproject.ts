import Web from './src/web'
import { createSecureServer, createServer } from './src/servers'

const { NODE_ENV } = process.env

console.log('Ξ Launching @io-project-2020')

NODE_ENV === 'production'
  ? createSecureServer(Web).listen(443)
  : createServer(Web).listen(80)
