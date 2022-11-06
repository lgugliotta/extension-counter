/*
  Local config for development can be created in the index.local.js file (which is included in .gitignore)
  If the file is not found, then we set the defaults
*/
const defaultEnvironment = {
  NAME: 'Extension Counter',
  ENV: 'DEVELOPMENT',
  LOG_LEVEL: 'DEBUG',
  PORT: 3000,
  GITHUB: {
    URL: 'https://api.github.com',
    TOKEN: ''
  }
}

let devEnvironment;

try {
  const { dev } = require('./index.local');
  devEnvironment = dev;
} catch (e) {
  devEnvironment = defaultEnvironment
}
const config = {
  NAME: process.env.NAME || devEnvironment.NAME || defaultEnvironment.NAME,
  ENV: process.env.ENV || devEnvironment.ENV || defaultEnvironment.ENV,
  PORT: process.env.PORT|| devEnvironment.PORT || defaultEnvironment.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL|| devEnvironment.LOG_LEVEL || defaultEnvironment.LOG_LEVEL,
  GITHUB: {
    URL: process.env.GITHUB_URL|| devEnvironment.GITHUB.URL || defaultEnvironment.GITHUB.URL,
    TOKEN: process.env.GITHUB_TOKEN || devEnvironment.GITHUB.TOKEN || defaultEnvironment.GITHUB.TOKEN,
  }
}

module.exports = {
  config
}
