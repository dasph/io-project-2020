import * as Koa from 'koa'
import { main, api } from './src/web'

const { PORT, API_PORT } = process.env

console.log('Ξ Launching @indorm')
new Koa().use(main.routes()).listen(PORT)
new Koa().use(api.routes()).listen(API_PORT)
