const fs = require("fs")
const _ = require("lodash")
const shell = require("shelljs")
const packageFn = require("./utils/package")
const initEslint = require("./utils/eslint")
const { eslint_json, husky_json } = require("./utils/config")
/*
 *@Description: HbuilderX 包初始化
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 18:44:36
 */
function hbuilderInit(preset, meta, ans) {
  const { name } = meta;
  const { lint, husky } = ans;
  const fileName = `${name}/package.json`;
  const packageObj = packageFn(preset);

  if (lint === "eslint") {
    initEslint(name);
    _.merge(meta, eslint_json);
  }
  if (husky === "husky") {
    // if(!fs.existsSync(`./${name}/.husky`)) {
    //   fs.mkdirSync(`./${name}/.husky`);  // 创建.husky
    //   shell.exec(`cd ./${name} && git init`)
    // }
    shell.exec(`cd ./${name} && git init`);
    _.merge(meta, husky_json);
  }
  _.merge(packageObj, meta);
  if (fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, JSON.stringify(packageObj, null, "\t"));
  }
}

module.exports = hbuilderInit