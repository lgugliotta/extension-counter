const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { config } = require('./config');
const { logger } = require('./utils');
const controller = require('./controllers');
const middleware = require('./middlewares');
const { mapAppErrorToRestError } = require('./errors');

//Support large URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// SUpport large JSON-encoded bodies
app.use(bodyParser.json());

// Support Cross-Domain calling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type','application/json')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE')
  next();
});

// Response handler function
const handleRes = fn => async (req, res, next) => {
  try {
    let data = await fn(req, res);
    res.status(200).json(data)
  }
  catch (err) {
    mapAppErrorToRestError(err, res);
  }
}

/* ROutes */
app.post('/repo/extension-count',
    [middleware.printRequestAndPayload, middleware.isUrl],
    handleRes((req, res) => controller.githubController.getExtensionCounter(req.body))
);

// Initialize Server
app.listen(config.PORT, async ()=> {
  logger.log(`${config.NAME} server is listening on port : ${config.PORT}`, 'debug');
});

process.on('uncaughtException', (err) => {
  logger.log(`uncaughtException: ${err?.stack}`, 'error');
  process.exit(1)
});
