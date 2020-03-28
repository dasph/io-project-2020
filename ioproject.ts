import Web from './src/web'

const { NODE_ENV } = process.env

console.log('Ξ Launching @io-project-2020')

Web.listen(NODE_ENV === 'production' ? 443 : 80)
