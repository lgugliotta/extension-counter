const { logger } = require('../utils');
const { githubService } = require("../services");
const utils = require('../utils');

/**
 * This returns the count of extensions files avoiding hidden files (ex: .gitignore, .github, etc)
 * and no extension files (ex: LICENCE)
 * @param body
 * @returns {Promise<any|undefined>}
 */
const getExtensionCounter = async (body) => {
  logger.log('getExtensionCounter()', 'info');
  const { repoURL } = body;
  const treeData = getRepoInfoFromUrl(repoURL);
  const url = githubService.generateTreeUrl(treeData)
  const files = await getFiles(url);
  return getCountByExtension(files);
}

/**
 * This returns a deep string array with the filenames of a tree
 * @param url
 * @returns {Promise<*>}
 */
const getFiles = async (url) => {
  let files = [];
  const sha = await githubService.getTree(url);
  if (sha.tree?.length > 0) {
    files = await Promise.all(sha.tree
        .filter(treeElement => !treeElement.path.startsWith('.')) // Excludes Hidden files
        .filter(treeElement => treeElement.path.includes('.') || treeElement.type == 'tree') //Excludes no extension files avoiding exclude trees
        .map(async treeElement => {
          if (treeElement.type == 'tree') {
            return await getFiles(treeElement.url)
          } else if (treeElement.type == 'blob') {
            return treeElement.path
          }
        })
    )
  }
  return utils.flattenDeep(files);
}

/**
 * This returns an object with a count of files by extension
 * ex: {"md":187,"js":32,"json":2,"config":2,"lock":1,"woff":2,"woff2":2,"scss":3,"png":11,"svg":209,"mdx":4,"gif":1}
 * @param files
 * @returns {*}
 */
const getCountByExtension = (files) => {
  return files.reduce((acc, file) => {
    const ext = file.split('.').pop()
    acc[ext] = (acc[ext] || 0) + 1;
    return acc;
  }, {})
}

/**
 * This gets the owner, repo, and branch destructuring the repo url
 * @param repoUrl
 * @returns {{owner: string, repo: string, sha: string}}
 */
const getRepoInfoFromUrl = (repoUrl) => {
  const url = new URL(repoUrl);
  const pathname = url.pathname;
  const repoData = pathname.split('/');
  return {
    owner: repoData[1],
    repo: repoData[2],
    sha: repoData[3] ? repoData[3] : 'master'
  }
}

module.exports = {
  getExtensionCounter
}
