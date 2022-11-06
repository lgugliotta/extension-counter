const githubController = require('../../controllers/github.controller');
const gitHubService = require("../../services/github.service");
const logger = require('../../utils/logger');
const treeMock = require("../mocks/tree.json");
const treeWithoutFolders = require('../mocks/tree-without-folders.json')

describe('Github controller tests', () => {
  const body = {
    repoURL: 'https://github.com/argoproj/argo-site'
  };
  const mocks = {
    getTreeMock: gitHubService.getTree = jest.fn(),
    logMock: logger.log = jest.fn()
  }

  beforeEach(() => {
    Object.keys(mocks).map((e) => mocks[e].mockReset());
  })

  /**
   * This emulates a repo with 3 folders in root and each folder have 2 files
   */
  it('Should Get extension Count', async () => {
    mocks.getTreeMock
        .mockResolvedValueOnce(treeMock)
        .mockResolvedValueOnce(treeWithoutFolders)
        .mockResolvedValueOnce(treeWithoutFolders)
        .mockResolvedValueOnce(treeWithoutFolders);
    const result = await githubController.getExtensionCounter(body);
    expect(result).toHaveProperty('js')
  })

  it('should return error for invalid body', function () {

  });
})
