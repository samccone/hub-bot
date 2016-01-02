var express = require('express');
var app = express();

app.post('/action', (req, res) => {
  //TODO
  //processBody(req.body);
  res.status(200);
  res.end();
});

/**
 * @param {string} port
 */
function boot(port) {
  console.log(`App running on ${port}`);
  var server = app.listen(port);
}

function kill() {
  server.close();
}

module.exports = {
  boot: boot,
  kill: kill,
}
