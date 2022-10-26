let fs = require('fs')

const pipe = (source, target) => {
  let rs = fs.createReadStream(source, { highWaterMark: 4 }),
      ws = fs.createWriteStream(target, { highWaterMark: 1 });
  rs.pipe(ws)
}

module.exports = pipe
