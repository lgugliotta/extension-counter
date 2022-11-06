const gitHubService = require('../../services/github.service');
const treeMock = require('../mocks/tree.json')
const {AppError, Errors} = require("../../errors");

const url = '/repos/OWNER/REPO/git/trees/121212121';

describe('Github service tests', () => {
  it('Should get a tree', async () => {
    gitHubService.getTree = jest.fn().mockResolvedValue(treeMock)
    const result = await gitHubService.getTree(url);
    expect(result).toEqual(treeMock);
    expect(gitHubService.getTree).toBeCalledTimes(1);
    expect(gitHubService.getTree).toHaveBeenNthCalledWith(1, url);
  })

  it('should return an error getting tree', async () => {
    gitHubService.getTree = jest.fn().mockRejectedValueOnce(
        new AppError(Errors.INTERNAL_ERROR, 'Error getting tree from GitHub'
        ));
    try {
      await gitHubService.getTree(url);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(gitHubService.getTree).toBeCalledTimes(1);
      expect(gitHubService.getTree).toHaveBeenNthCalledWith(1, url);
    }
  });

  it('should return an error when repo not found', async () => {
    gitHubService.getTree = jest.fn().mockRejectedValueOnce(
        new AppError(Errors.NOT_FOUND, 'Repo not found'
        ));
    try {
      await gitHubService.getTree(url);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(gitHubService.getTree).toBeCalledTimes(1);
      expect(gitHubService.getTree).toHaveBeenNthCalledWith(1, url);
    }
  });

  it('Should generate a URL', () => {
    const result = gitHubService.generateTreeUrl({
      owner: 'OWNER', repo: 'REPO', sha: '121212121'}
    );
    expect(result).toEqual(url);
  })
})
