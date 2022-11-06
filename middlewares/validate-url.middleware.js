const { AppError, Errors, mapAppErrorToRestError } = require('../errors');
const utils = require('../utils');
const {logger} = require("../utils");

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
    logger.log('Missing "repoURL" prop', 'info')
    error = new AppError(Errors.INVALID_PARAMETERS, 'Missing "repoURL" prop');
    return mapAppErrorToRestError(error, res);
  }

  const { repoURL } = req.body;
  if (utils.isValidUrl(repoURL)) {
    logger.log(`Valid Repo URL: ${repoURL}`, 'info')
    return next();
  } else {
    logger.log('Insvalid repo URL', 'info')
    error = new AppError(Errors.INVALID_PARAMETERS, 'Insvalid repo URL');
    return mapAppErrorToRestError(error, res);
  }
}

module.exports = {
  isUrl
}
