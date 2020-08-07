import { Web } from './src/web'

const { PORT } = process.env

console.log('Ξ Launching @indorm')
Web.listen(PORT)
