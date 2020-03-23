const { createServer } = require('http')
const { exec } = require('child_process')

createServer((req, res) => {
  if (req.headers['x-github-event'] === 'push') {
    console.log('starting deployment')
    exec('npm run deploy',() => console.log('deployment ended'))
    return res.end()
  }

  res.statusCode = 400
  res.end()
}).listen(8080)
