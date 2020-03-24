module.exports = {
  apps : [{
    name: 'io-project',
    script: 'dist/ioproject.js',
    cwd: '/srv/io-project-2020',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M'
  }]
}
