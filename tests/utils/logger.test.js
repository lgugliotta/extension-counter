const logger = require('../../utils/logger');

describe('Logger unit test', () => {
  logger.log = jest.fn();

  test('Should log in debug level', () => {
    logger.log('Debug log', 'debug');
    expect(logger.log).toBeCalledWith('Debug log', 'debug');
  });
})
