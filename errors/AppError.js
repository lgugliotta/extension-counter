/**
 * @description Customized Error Class for handle in mapAppErrorToRestError
 */
class AppError extends Error {
  constructor(statusCode, error) {
    if (typeof error === 'string') {
      super(error);
      this.message = error;
    } else {
      super(error.message);
      this.message = error.message;
    }

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);

    this.statusCode = statusCode;
    this.name = this.constructor.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

module.exports = {
  AppError
}
