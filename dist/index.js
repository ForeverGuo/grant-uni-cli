"use strict";

var program = require('commander');

var download = require('download-git-repo');

var inquirer = require('inquirer');

var fs = require('fs');

var path = require('path');

var ora = require('ora'); // 加载提示


var chalk = require('chalk'); // 为打印信息加上样式


var symbols = require('log-symbols'); // 在输出信息前面加上 A x等图标


var _ = require('lodash');

var shell = require('shelljs');

var _require = require('./utils/config'),
    templates = _require.templates,
    eslint_json = _require.eslint_json,
    husky_json = _require.husky_json;

var pipe = require('./utils/pipe');

var packageObj = require('./files/package');

var prompt = require('./utils/prompt');

var initEslint = require('./utils/eslint');

var packageJsonData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './package.json'), 'utf8'));
var log = console.log;
program.version("".concat(packageJsonData.version), '-v, --version').command('create <name>').action(function (name) {
  // 命令行交互
  inquirer.prompt(prompt).then(function (answer) {
    var loading = ora('The template is loading ...');
    loading.start();
    download("".concat(templates[answer.preset]), name, {}, function (err) {
      console.log(err ? 'Error' : 'Success');

      if (err) {
        loading.fail();
        console.log(symbols.error, chalk.red(err));
      } else {
        loading.succeed();
        var fileName = "".concat(name, "/package.json");
        var meta = {
          name: name,
          description: answer.description,
          version: answer.version || '1.0.0',
          author: answer.author,
          devDependencies: {}
        };

        if (answer.lint === 'eslint') {
          initEslint(name);

          _.merge(meta, eslint_json);
        }

        if (answer.husky === 'husky') {
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

        console.log(symbols.success, chalk.green('Done'));
        log(chalk.blue("   \n     \u6B22\u8FCE\u4F7F\u7528 uniapp \u811A\u624B\u67B6 \n\n      \u5F53\u524D\u7248\u672C ".concat(packageJsonData.version, " \n")));
        log(chalk.red("     1  cd ".concat(name, " \n")));
        log(chalk.red("     2  npm run init \n"));
        log(chalk.yellow("    Please run in HBuilder X \n"));
      }
    });
  });
});
program.parse(process.argv);