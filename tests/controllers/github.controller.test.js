const githubController = require('../../controllers/github.controller');
const gitHubService = require("../../services/github.service");
const logger = require('../../utils/logger');
const treeMock = require("../mocks/tree.json");

describe.skip('Github controller tests', () => {
  const validBody = {
    repoURL: 'https://github.com/argoproj/argo-site'
  };
  const invalidBody = {
    repoUrl: 'https://github.com/argoproj/argo-site'
  };
  const url = '/repos/OWNER/REPO/git/trees/121212121';
  const mocks = {
    getTreeMock: gitHubService.getTree = jest.fn(),
    generateTreeUrlMock: gitHubService.generateTreeUrl = jest.fn(),
    logMock: logger.log = jest.fn()
  }

  beforeEach(() => {
    Object.keys(mocks).map((e) => mocks[e].mockReset());
  })

  it('Should Get extension Count', async () => {
    mocks.getTreeMock.mockResolvedValueOnce(treeMock);
    mocks.generateTreeUrlMock.mockReturnValue(url);
    const result = await githubController.getExtensionCounter(validBody);
    expect(result).toHaveProperty('js')
  })
})
