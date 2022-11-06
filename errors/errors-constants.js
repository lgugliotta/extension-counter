/**
 * AppErrors Literals
 */
const Errors = {
  INVALID_PARAMETERS: 'INVALID_PARAMETERS',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND',
}

/**
 * AppErrors Status Codes
 */
const ErrorStatusCodes = {
  INVALID_PARAMETERS: 400,
  INTERNAL_ERROR: 500,
  NOT_FOUND: 404,
}

module.exports = {
  Errors,
  ErrorStatusCodes
}
