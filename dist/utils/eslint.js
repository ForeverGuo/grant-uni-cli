"use strict";

var path = require('path');

var pipe = require('./pipe');

var fs = require('fs');

var resolvePath = function resolvePath(path_name) {
  var base_path = '../../files';
  return path.resolve(__dirname, base_path, "./".concat(path_name));
};

var initEslint = function initEslint(name) {
  pipe(resolvePath('.eslintrc.js'), path.resolve(process.cwd(), "./".concat(name, "/.eslintrc.js")));
  pipe(resolvePath('.eslintignore'), path.resolve(process.cwd(), "./".concat(name, "/.eslintignore")));
  pipe(resolvePath('.prettierrc'), path.resolve(process.cwd(), "./".concat(name, "/.prettierrc")));

  if (!fs.existsSync("./".concat(name, "/.vscode"))) {
    fs.mkdirSync("./".concat(name, "/.vscode"));
    pipe(resolvePath('setting.json'), path.resolve(process.cwd(), "./".concat(name, "/.vscode/setting.json")));
  }
};

module.exports = initEslint;