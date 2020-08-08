import { main, api } from './src/web'

const { PORT, API_PORT } = process.env

console.log('Ξ Launching @indorm')
main.listen(PORT)
api.listen(API_PORT)
