const errors = require('../../errors');
const logger = require('../../utils/logger')

describe('Tests for errors handling', () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const loggerSpy = jest.spyOn(logger, 'log')

  it('should map AppError NotFound to rest response', () => {
    const notFoundAppError = new errors.AppError(errors.Errors.NOT_FOUND, 'Repo not found');
    const result = errors.mapAppErrorToRestError(notFoundAppError, mockRes());
  });

  it('should map AppError InternalError to rest response', () => {
    const notFoundAppError = new errors.AppError(errors.Errors.INTERNAL_ERROR, 'Internal Server Error');
    const result = errors.mapAppErrorToRestError(notFoundAppError, mockRes());
  });

  it('should map not enumerated AppError to rest response', () => {
    const notFoundAppError = new errors.AppError('SOME_ERROR', 'whatever error');
    const result = errors.mapAppErrorToRestError(notFoundAppError, mockRes());
  });

  it('should map Error to rest response', () => {
    const notFoundAppError = new Error('Errorrrr');
    const result = errors.mapAppErrorToRestError(notFoundAppError, mockRes());
    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy).toBeCalledWith("Caution! No App Error: Error: Errorrrr", 'error')
  });
})
