"use strict";

var path = require('path');

var pipe = require('./pipe');

var fs = require('fs');

var initEslint = function initEslint(name) {
  pipe(path.resolve(__dirname, "../files/.eslintrc.js"), path.resolve(process.cwd(), "./".concat(name, "/.eslintrc.js")));
  pipe(path.resolve(__dirname, "../files/.eslintignore"), path.resolve(process.cwd(), "./".concat(name, "/.eslintignore")));
  pipe(path.resolve(__dirname, "../files/.prettierrc"), path.resolve(process.cwd(), "./".concat(name, "/.prettierrc")));

  if (!fs.existsSync("./".concat(name, "/.vscode"))) {
    fs.mkdirSync("./".concat(name, "/.vscode"));
    pipe(path.resolve(__dirname, "../files/setting.json"), path.resolve(process.cwd(), "./".concat(name, "/.vscode/setting.json")));
  }
};

module.exports = initEslint;