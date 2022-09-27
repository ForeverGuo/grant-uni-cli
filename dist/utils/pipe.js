"use strict";

var fs = require('fs');

var pipe = function pipe(source, target) {
  var rs = fs.createReadStream(source, {
    highWaterMark: 4
  }),
      ws = fs.createWriteStream(target, {
    highWaterMark: 1
  });
  rs.pipe(ws);
};

module.exports = pipe;