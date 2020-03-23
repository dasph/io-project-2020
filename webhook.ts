const { createServer } = require('http')
const { exec } = require('child_process')

createServer((req, res) => {
  if (req.headers['x-github-event'] === 'push') {
    exec('npm run deploy')
    return res.end()
  }

  res.statusCode = 400
  res.end()
}).listen(8080)
