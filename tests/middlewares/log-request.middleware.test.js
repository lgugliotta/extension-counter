const logRequestMiddleware = require('../../middlewares/log-request.middleware');
const logger = require('../../utils/logger');

describe('Log request middleware tests', () => {
  const loggerSpy = jest.spyOn(logger, 'log')

  it('should log a request', () => {
    const nextMock = jest.fn();
    const reqMock = {
      path: '/repo/extension-count',
      body: { repoURL: 'lalalalla'}
    };
    const resMock = {}
    const message = `Request Path: ${reqMock?.path} Query: ${JSON.stringify(reqMock.query)} Payload: ${JSON.stringify(reqMock?.body)}`;

    logRequestMiddleware.printRequestAndPayload(reqMock, resMock, nextMock);
    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy).toBeCalledWith(message, 'debug')
  });

  it('should log with error', () => {
    const nextMock = jest.fn();
    logRequestMiddleware.printRequestAndPayload(undefined, {}, nextMock);
    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy). toBeCalledWith("printRequestAndPayload: TypeError: Cannot read property 'query' of undefined", 'error')
  });
});
