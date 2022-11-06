const { AppError, Errors, mapAppErrorToRestError } = require('../errors');
const utils = require('../utils');

/**
 * Middleware for validate de repoURL
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const isUrl = (req, res, next) => {
  let error;

  if (!req.body.repoURL) {
    error = new AppError(Errors.INVALID_PARAMETERS, 'Missing "repoURL" prop');
    return mapAppErrorToRestError(error, res);
  }

  const { repoURL } = req.body;
  if (utils.isValidUrl(repoURL))
    return next();

  error = new AppError(Errors.INVALID_PARAMETERS, 'Insvalid repo URL');
  return mapAppErrorToRestError(error, res);
}

module.exports = {
  isUrl
}
