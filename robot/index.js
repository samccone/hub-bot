var request = require('./util/request_util');
var url = require('./util/url_builder');

const TOKEN = process.env.GH_TOKEN;
const PORT = process.env.PORT || 8888;

if (TOKEN === undefined) {
  throw new Error('Please set GH_TOKEN env var');
}

/**
 * @param {string} repoPath
 * @param {string|number} number
 *
 * @returns {Promise}
 */
function getLastCommitSHA(repoPath, number) {
  return request.get(url.sign(url.prCommits(repoPath, number), TOKEN))
  .then((body) => {
    return JSON.parse(body).slice(-1)[0].sha
  });
}

/**
 * @param {string} repoPath the username/repo combo
 * @param {number} number the pr number
 * @param {string} line the line to comment on
 * @param {string} body the body of the comment
 * @param {string} file the relative path of the file in the repo
 *
 * @returns {Promise}
 */
function patchComment(repoPath, number, file, line, body) {
  return getLastCommitSHA(repoPath, number).then((sha) => {
    return request.post(url.sign(url.patchComment(repoPath, number), TOKEN), {
      "body": body,
      "commit_id": sha,
      "path": file,
      "position": line,
    });
  });
}

/**
 * @param {string} repoPath the username/repo combo
 * @param {string} number the issue/pr number
 * @param {string} body the comment body
 */
function prComment(repoPath, number, body) {
  return request.post(url.sign(url.prComment(repoPath, number), TOKEN), {
    body: body
  });
}


/*
prComment('samccone/test-repo', 1, 'test2');
patchComment('samccone/test-repo', 1, 'sample.txt', 7, 'sample');
*/
