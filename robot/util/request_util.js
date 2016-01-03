const AGENT = 'hub-bot';
var request = require('request');

/**
 * @private
 * @param {string} url
 * @returns {Promise}
 */
function get(url) {
  var p = Promise.defer();

  request(url, {
    headers: {
      'User-Agent': AGENT,
      'Accept': 'application/vnd.github.v3+json',
    }
  }, function(err, _, body) {
    if (err) {
      p.reject(err);
    } else {
      p.resolve(body);
    }
  });

  return p.promise;
}

/**
 * @private
 * @param {string} url
 * @param {Object} json The json to post
 * @returns {Promise}
 */
function post(url, json) {
  var p = Promise.defer();

  request(url, {
    method: 'POST',
    headers: {
      'User-Agent': AGENT,
      'Accept': 'application/vnd.github.v3+json',
    },
    json: json,
  }, function(err, _, body) {
    if (err) {
      p.reject(err);
    } else {
      p.resolve(body);
    }
  });

  return p.promise;
}

module.exports = {
  post: post,
  get: get,
};
