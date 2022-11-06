/**
 * This flats a deep array
 * @param arr
 * @returns {*}
 */
const flattenDeep = (arr) => {
  return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

module.exports = {
  flattenDeep
}
