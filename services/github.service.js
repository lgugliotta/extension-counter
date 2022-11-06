const axios = require('axios');
const { config } = require('../config')
const { logger } = require("../utils");

/**
 * Github API requests config
 * @type {AxiosInstance}
 */
const gitHubApi = axios.create({
  baseURL: config.GITHUB.URL,
  headers: {
    'Authorization': `Bearer ${config.GITHUB.TOKEN}`,
  }
})

/**
 * Get a tree Github API request
 * @param url
 * @returns {Promise<any>}
 */
const getTree = async (url) => {
  try {
    logger.log(`Getting tree form ${url}`, 'info');
    return (await gitHubApi.get(url)).data
  } catch (e) {
    //TODO: handle error here
    logger.log('Error getting tree from GitHub: ' + e, 'error');
    throw new Error(e)
  }
}

/**
 * This generates the pathname needed
 * @param owner
 * @param repo
 * @param sha
 * @returns {`/repos/${string}/${string}/git/trees/${string}`}
 */
const generateTreeUrl = ({owner, repo, sha}) => {
  return `/repos/${owner}/${repo}/git/trees/${sha}`
}

module.exports = {
  getTree,
  generateTreeUrl
}
