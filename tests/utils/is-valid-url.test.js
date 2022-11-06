const { isValidUrl } = require('../../utils/is-valid-url');

describe('isValidUrl util function tests', () => {
  const validUrl = 'http://google.com'
  const invalidUrl = 'http://googlecom'
  it('should be return true when url is valid', () => {
    const result = isValidUrl(validUrl);
    expect(result).toBeTruthy()
  });

  it('should be return true when url is valid', () => {
    const result = isValidUrl(invalidUrl);
    expect(result).toBeFalsy()
  });
})
