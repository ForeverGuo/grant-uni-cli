"use strict";

var program = require("commander");

var inquirer = require("inquirer");

var fs = require("fs");

var _require = require("./utils/log"),
    log = _require.log,
    specialSymbol = _require.specialSymbol,
    chalk = _require.chalk,
    symbols = _require.symbols;

var _require2 = require("./utils/config"),
    templates = _require2.templates,
    npmVersion = _require2.npmVersion;

var _require3 = require("./utils/prompt"),
    default_prompts = _require3.default_prompts,
    eslint_prompts = _require3.eslint_prompts;

var downloadInit = require('./download');

var cliInit = require('./createCli');

var hbuilderInit = require('./createHbx');

program.option('-l, --list', '查看可用模版列表').action(function () {
  log(templates);
});
program.version(npmVersion, "-v, --version") //  设置版本号
.command("create <name>") // 设置指令交互
.description("创建项目") // 指令的描述
.action(function (name) {
  // 创建项目名称
  specialSymbol();

  if (fs.existsSync(name)) {
    log(symbols.error, chalk.red('当前文件已存在~'));
    return;
  } // 默认选项


  var default_inquirer = inquirer.prompt(default_prompts); // 输出交互指令

  default_inquirer.then(function (ans) {
    var preset = ans.preset,
        version = ans.version,
        description = ans.description,
        author = ans.author; // 输出用户的结果

    var meta = {
      // 创建对象来配置生成文件
      name: name,
      description: description,
      version: version || "1.0.0",
      author: author,
      devDependencies: {}
    };

    if (preset === 'vue2-hbx') {
      // vue2 版本 + eslint + husky 配置选项
      var eslint_inquirer = inquirer.prompt(eslint_prompts);
      eslint_inquirer.then(function (res) {
        downloadInit(hbuilderInit, preset, meta, res);
      });
    }

    if (preset === 'vue3-hbx') {
      // vue3 版本 目前 eslint + husky 没有进行测试
      downloadInit(hbuilderInit, preset, meta, null);
    }

    if (preset.includes('cli')) {
      //  node 版本
      downloadInit(cliInit, preset, meta, null);
    }
  });
});
program.parse(process.argv); // 参数解析