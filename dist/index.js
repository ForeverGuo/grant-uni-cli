"use strict";

var program = require("commander");

var download = require("download-git-repo");

var inquirer = require("inquirer");

var fs = require("fs");

var handlebars = require('handlebars');

var _ = require("lodash");

var shell = require("shelljs");

var _require = require("./tools/index"),
    log = _require.log,
    specialSymbol = _require.specialSymbol,
    chalk = _require.chalk,
    ora = _require.ora,
    symbols = _require.symbols;

var _require2 = require("./utils/config"),
    templates = _require2.templates,
    eslint_json = _require2.eslint_json,
    husky_json = _require2.husky_json;

var _require3 = require("./utils/prompt"),
    default_prompts = _require3.default_prompts,
    eslint_prompts = _require3.eslint_prompts;

var packageFn = require("./utils/package");

var initEslint = require("./utils/eslint"); // 但前包版本


var npmVersion = '1.1.3';
program.option('-l, --list', '查看可用模版列表').action(function () {
  log(templates);
});
program.version(npmVersion, "-v, --version").command("create <name>").description("创建项目").action(function (name) {
  specialSymbol(); // 默认选项

  var default_inquirer = inquirer.prompt(default_prompts);
  default_inquirer.then(function (ans) {
    var preset = ans.preset,
        version = ans.version,
        description = ans.description,
        author = ans.author;
    var meta = {
      name: name,
      description: description,
      version: version || "1.0.0",
      author: author,
      devDependencies: {}
    };

    if (preset === 'vue2-hbx') {
      var eslint_inquirer = inquirer.prompt(eslint_prompts);
      eslint_inquirer.then(function (res) {
        downloadInit(hbuilderInit, preset, meta, res);
      });
    }

    if (preset === 'vue3-hbx') {
      downloadInit(hbuilderInit, preset, meta, null);
    }

    if (preset.includes('cli')) {
      downloadInit(cliInit, preset, meta, null);
    }
  });
});
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

  if (lint === 'eslint') {
    initEslint(name);

    _.merge(meta, eslint_json);
  }

  if (husky === 'husky') {
    // if(!fs.existsSync(`./${name}/.husky`)) {
    //   fs.mkdirSync(`./${name}/.husky`);  // 创建.husky
    //   shell.exec(`cd ./${name} && git init`)
    // }
    shell.exec("cd ./".concat(name, " && git init"));

    _.merge(meta, husky_json);
  }

  _.merge(packageObj, meta);

  if (fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, JSON.stringify(packageObj, null, '\t'));
  }
}
/*
 *@Description: CLI 包初始化
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 18:45:03
*/


function cliInit(preset, meta, ans) {
  var name = meta.name;
  var fileName = "".concat(name, "/package.json");

  if (fs.existsSync(fileName)) {
    var content = fs.readFileSync(fileName).toString();
    var result = handlebars.compile(content)(meta);
    fs.writeFileSync(fileName, result);
  }
}
/*
 *@Description: download 下载包
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 18:52:28
*/


function downloadInit(fn, preset, meta, prompts) {
  var loading = ora('The template is loading ...');
  loading.start();
  var name = meta.name;
  download("".concat(templates[preset]), name, {}, function (err) {
    log(err ? 'Error' : 'Success');

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
  log(symbols.success, chalk.green('Done'));
  log(chalk.blue("   \n     \u6B22\u8FCE\u4F7F\u7528 uniapp \u811A\u624B\u67B6 \n\n      \u5F53\u524D\u7248\u672C ".concat(npmVersion, " \n")));
  log(chalk.greenBright("     1  cd ".concat(name, " \n")));
  log(chalk.greenBright("     2  npm install \n"));

  if (preset.includes('hbx')) {
    log(chalk.yellow("    Please run in HBuilderX \n"));
  } else {
    log(chalk.greenBright("     3  npm run dev \n"));
    log(chalk.yellow("    HBuilderX OR VScode \n"));
  }
}

program.parse(process.argv);