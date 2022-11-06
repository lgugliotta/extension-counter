const { flattenDeep } = require('../../utils/flatten-deep');

describe('Flat Deep Array function test', () => {
  it('Should be flatten a deep array', () => {
    const deepArray = [1, 2, [3, 4, [5, 6, [7, 8]]], 9];
    const result = flattenDeep(deepArray);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  })
})
