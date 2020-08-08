import { main, api } from './src/web'

const { MAIN_PORT, API_PORT } = process.env

console.log('Ξ Launching @indorm')
main.listen(MAIN_PORT)
api.listen(API_PORT)
