module.exports = {
  apps : [{
    name: 'io-project',
    script: 'dist/ioproject.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M'
  }]
}
