const { AppError } = require('./AppError');
const { Errors, ErrorStatusCodes } = require('./errors-constants');
const { logger } = require('../utils')
/**
 * @description Map App Errors to REST Error for avoid sending to the client sensible/unnecessary info
 * @param err
 * @param res
 */
const mapAppErrorToRestError = (err, res) => {
  const code = Object.keys(ErrorStatusCodes).includes(err.statusCode) ? ErrorStatusCodes[err.statusCode] : 500;
  let message = 'Internal Server Error...'
  let name = 'InternalServerError'

  if (err instanceof AppError) {
    switch (err.statusCode) {
      case Errors.INVALID_PARAMETERS:
        message = err.message;
        name = 'BadRequestError';
        break;
      case Errors.INTERNAL_ERROR:
        message = 'Internal Server Error';
        name = 'InternalServerError';
        break;
      case Errors.CONFLICT_ERROR:
        message = err.message;
        name = 'ConflictError';
        break;
      case Errors.UNAVAILABLE_ERROR:
        message = err.message ? err.message : 'Service Unavailable';
        name = 'ServiceUnavailableError';
        break;
      case Errors.NOT_FOUND:
        message = err.message;
        name = 'NotFoundError';
        break;
      default:
        message = 'Internal Server Error';
        name = 'InternalServerError';
    }
  } else {
    logger.log('Caution! No App Error: ' + err, 'error')
  }
  return res.status(code).json({code, name, message})
}

module.exports = {
  mapAppErrorToRestError,
}
