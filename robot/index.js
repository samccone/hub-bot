var request = require('request');
var express = require('express');

const API_BASE = 'https://api.github.com';
const TOKEN = process.env.GH_TOKEN
const PORT = process.env.PORT || 8888;

var app = express();

if (TOKEN === undefined) {
  throw new Error('Please set GH_TOKEN env var');
}

app.post('/action', (req, res) => {
  processBody(req.body);
  res.status(200);
  res.end();
});

console.log(`App running on ${PORT}`);
app.listen(PORT);

function processBody(body) {
  console.log(body.actions);
}

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
