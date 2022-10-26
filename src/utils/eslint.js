const path = require('path')
const pipe = require('./pipe')
const fs = require('fs')

const resolvePath = (path_name) => {
  const base_path = '../../files'
  return path.resolve(__dirname, base_path, `./${path_name}`)
}

const initEslint = (name) => {
  pipe(
    resolvePath('.eslintrc.js'),
    path.resolve(process.cwd(), `./${name}/.eslintrc.js`)
  );
  pipe(
    resolvePath('.eslintignore'),
    path.resolve(process.cwd(), `./${name}/.eslintignore`)
  );
  pipe(
    resolvePath('.prettierrc'),
    path.resolve(process.cwd(), `./${name}/.prettierrc`)
  );
  if (!fs.existsSync(`./${name}/.vscode`)) {
    fs.mkdirSync(`./${name}/.vscode`);
    pipe(
      resolvePath('setting.json'),
      path.resolve(process.cwd(), `./${name}/.vscode/setting.json`)
    );
  }
};

module.exports = initEslint

