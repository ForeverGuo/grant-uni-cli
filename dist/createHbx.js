"use strict";

var fs = require("fs");

var _ = require("lodash");

var shell = require("shelljs");

var packageFn = require("./utils/package");

var initEslint = require("./utils/eslint");

var _require = require("./utils/config"),
    eslint_json = _require.eslint_json,
    husky_json = _require.husky_json;
/*
 *@Description: HbuilderX 包初始化
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 18:44:36
 */


function hbuilderInit(preset, meta, ans) {
  var name = meta.name;
  var lint = ans.lint,
      husky = ans.husky;
  var fileName = "".concat(name, "/package.json");
  var packageObj = packageFn(preset);

  if (lint === "eslint") {
    initEslint(name);

    _.merge(meta, eslint_json);
  }

  if (husky === "husky") {
    // if(!fs.existsSync(`./${name}/.husky`)) {
    //   fs.mkdirSync(`./${name}/.husky`);  // 创建.husky
    //   shell.exec(`cd ./${name} && git init`)
    // }
    shell.exec("cd ./".concat(name, " && git init"));

    _.merge(meta, husky_json);
  }

  _.merge(packageObj, meta);

  if (fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, JSON.stringify(packageObj, null, "\t"));
  }
}

module.exports = hbuilderInit;