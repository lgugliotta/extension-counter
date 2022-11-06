const validateUrlMiddleware = require('../../middlewares/validate-url.middleware');
const utils = require('../../utils');

describe('Validate URL middleware tests', () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const isValidUrlSpy = jest.spyOn(utils, 'isValidUrl');

  it('should validate if repoURL in body is valid', async () => {
    const nextMock = jest.fn();
    const reqMock = {
      path: '/repo/extension-count',
      body: { repoURL: 'http://google.com'}
    };
    const resMock = mockRes();
    validateUrlMiddleware.isUrl(reqMock, resMock, nextMock);
    expect(isValidUrlSpy).toBeCalledTimes(1);
    expect(isValidUrlSpy).toBeCalledWith('http://google.com')
  });

  it('should return error when missing "repoURL" prop', () => {
    const nextMock = jest.fn();
    const reqMock = {
      path: '/repo/extension-count',
      body: { repoURLeee: 'http://google.com'}
    };
    const resMock = mockRes();

    validateUrlMiddleware.isUrl(reqMock, resMock, nextMock);
    expect(isValidUrlSpy).toBeCalledTimes(0);
  });

  it('should return error when URL is invalid', () => {
    const nextMock = jest.fn();
    const reqMock = {
      path: '/repo/extension-count',
      body: { repoURL: 'http://googlecom'}
    };
    const resMock = mockRes();

    validateUrlMiddleware.isUrl(reqMock, resMock, nextMock);
    expect(isValidUrlSpy).toBeCalledTimes(1);
    expect(isValidUrlSpy).toBeCalledWith('http://googlecom')
  });
});
