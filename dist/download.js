"use strict";

var download = require("download-git-repo");

var _require = require("./utils/config"),
    templates = _require.templates;

var _require2 = require("./utils/log"),
    log = _require2.log,
    chalk = _require2.chalk,
    ora = _require2.ora,
    symbols = _require2.symbols;

var _require3 = require('./utils/config'),
    npmVersion = _require3.npmVersion;
/*
 *@Description: download 下载包
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 18:52:28
 */


function downloadInit(fn, preset, meta, prompts) {
  var loading = ora("The template is loading ...");
  loading.start();
  var name = meta.name;
  download("".concat(templates[preset]), name, {}, function (err) {
    log(err ? "Error" : "Success");

    if (err) {
      loading.fail();
      log(symbols.error, chalk.red(err));
    } else {
      loading.succeed(); // 处理逻辑

      if (fn) {
        fn(preset, meta, prompts);
      } // success log


      finalLog(preset, meta);
    }
  });
}
/**
 * @description 模版下载成功提示
 * @author grantguo
 * @date 2022-10-23 12:33:33
 */


function finalLog(preset, meta) {
  var name = meta.name;
  log(symbols.success, chalk.green("Done"));
  log(chalk.blue("   \n     \u6B22\u8FCE\u4F7F\u7528 uniapp \u811A\u624B\u67B6 \n\n      \u5F53\u524D\u7248\u672C ".concat(npmVersion, " \n")));
  log(chalk.greenBright("     1  cd ".concat(name, " \n")));
  log(chalk.greenBright("     2  npm install \n"));

  if (preset.includes("hbx")) {
    log(chalk.yellow("    Please run in HBuilderX \n"));
  } else {
    log(chalk.greenBright("     3  npm run dev \n"));
    log(chalk.yellow("    HBuilderX OR VScode \n"));
  }
}

module.exports = downloadInit;