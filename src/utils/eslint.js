const path = require('path')
const pipe = require('./pipe')
const fs = require('fs')

const initEslint = (name) => {
  pipe(
    path.resolve(__dirname, "../files/.eslintrc.js"),
    path.resolve(process.cwd(), `./${name}/.eslintrc.js`)
  );
  pipe(
    path.resolve(__dirname, "../files/.prettierrc"),
    path.resolve(process.cwd(), `./${name}/.prettierrc`)
  );
  if (!fs.existsSync(`./${name}/.vscode`)) {
    fs.mkdirSync(`./${name}/.vscode`);
    pipe(
      path.resolve(__dirname, "../files/setting.json"),
      path.resolve(process.cwd(), `./${name}/.vscode/setting.json`)
    );
  }
};

module.exports = initEslint

