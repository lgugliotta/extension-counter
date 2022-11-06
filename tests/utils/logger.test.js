const logger = require('../../utils/logger');

describe('Logger unit test', () => {
  console.log = jest.fn();
  // beforeEach(() => {
  //   console.log.mockReset();
  // })
  test('Should log in debug level', () => {
    logger.log('Debug log', 'debug');
    expect(console.log.mock.calls[0][0]).toContain('DEBUG');
  });

  test('Should log in error level, with Error instance', () => {
    logger.log(new Error('Errorrrr'), 'error');
    expect(console.log.mock.calls[0][0]).toContain('ERROR');
  });
})
