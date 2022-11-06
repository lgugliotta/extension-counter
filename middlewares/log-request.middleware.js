const { logger } = require('../utils');

/**
 * Request and payload logger middleware
 * @param req
 * @param res
 * @param next
 */
const printRequestAndPayload = (req, res, next) => {
  try {
    logger.log(`Request Path: ${req?.path} Query: ${JSON.stringify(req.query)} Payload: ${JSON.stringify(req?.body)}`, 'debug');
  } catch (err) {
    logger.log(`printRequestAndPayload: ${err}`, 'error');
  } finally {
    next();
  }
}

module.exports = {
  printRequestAndPayload
}
