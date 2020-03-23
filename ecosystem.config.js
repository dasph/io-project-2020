module.exports = {
  apps : [{
    name: 'io-project',
    script: 'dist/ioproject.js',
    cwd: '/srv/io-project-2020',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M',
    env: { NODE_ENV: 'production' }
  }],

  deploy : {
    production : {
      ref: 'origin/master',
      repo: 'git+https://github.com/daspharion/io-project-2020.git',
      path: '/srv/io-project-2020',
      'post-deploy': 'npm i && pm2 reload ecosystem.config.js'
    }
  }
}
