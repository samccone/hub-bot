const API_BASE = 'https://api.github.com';

/**
 * @param {string} repoPath the username/repo-name string
 * @param {string} number the issue/pr number
 * @returns {string}
 */
function patchComment(repoPath, number) {
  return `${API_BASE}/repos/${repoPath}/pulls/${number}/comments`
}

/**
 * @param {string} repoPath the username/repo-name string
 * @param {string} number the issue/pr number
 * @returns {string}
 */
function prComment(repoPath, number) {
  return `${API_BASE}/repos/${repoPath}/issues/${number}/comments`
}

/**
 * @param {string} repoPath the username/repo-name string
 * @param {string} number the issue/pr number
 * @returns {string}
 */
function prCommits(repoPath, number) {
  return `${API_BASE}/repos/${repoPath}/pulls/${number}/commits`
}

/**
 * @param {string} url
 * @param {string} token
 * @returns {string}
 */
function sign(url, token) {
  return `${url}?access_token=${token}`;
}

module.exports = {
  patchComment: patchComment,
  prComment: prComment,
  prCommits: prCommits,
  sign: sign,
};
