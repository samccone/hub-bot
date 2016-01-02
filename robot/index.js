var request = require('./util/request_util');

const API_BASE = 'https://api.github.com';
const TOKEN = process.env.GH_TOKEN;
const PORT = process.env.PORT || 8888;
const AGENT = 'hub-bot';

if (TOKEN === undefined) {
  throw new Error('Please set GH_TOKEN env var');
}

/**
 * @param {string} repoPath
 * @param {string} number
 *
 * @returns {Promise}
 */
function getLastCommitSHA(repoPath, number) {
  return request.get(signUrl(
    API_BASE + `/repos/${repoPath}/pulls/${number}/commits`, TOKEN), AGENT)
    .then((body) => {
      return JSON.parse(body).slice(-1)[0].sha
    });
}

/**
 * @param {string} repoPath the username/repo combo
 * @param {string} number the pr number
 * @param {string} line the line to comment on
 * @param {string} body the body of the comment
 * @param {string} file the relative path of the file in the repo
 * @param {string} sha the sha of the commit to comment on
 *
 * @returns {Promise}
 */
function patchComment(repoPath, number, file, line, body, sha) {
  //                       /repos/:owner/:repo/pulls/:number/comments
  request.post(signUrl(`${API_BASE}/repos/${repoPath}/pulls/${number}/comments`, TOKEN), AGENT, {
    "body": body,
    "commit_id": sha,
    "path": file,
    "position": line,
  });
}


/**
 * @param {string} url
 * @param {string} token
 *
 * @returns {string}
 */
function signUrl(url, token) {
  return `${url}?access_token=${token}`;
}

getLastCommitSHA('samccone/test-repo', 1).then((sha) => {
  return patchComment('samccone/test-repo', 1, 'sample.txt', 7, 'sample', sha)
}).then(console.log.bind(console, 'done')).catch(console.log.bind(console));

/*
request(API_BASE + `/repos/samccone/test-repo/issues/1/comments?access_token=${TOKEN}`, {
  method: 'POST',
  headers: {
    'User-Agent': 'hub-bot',
  },
  json: {
    body: ':horse:'
  },
}, function(err, httpRes, body) {
  console.log(err, httpRes.statusCode);
});
*/
