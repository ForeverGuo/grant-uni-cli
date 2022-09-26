"use strict";

var program = require('commander');

var download = require('download-git-repo');

var inquirer = require('inquirer');

var fs = require('fs');

var path = require('path');

var handlebars = require('handlebars'); // 对 package.json 进行编写


var ora = require('ora'); // 加载提示


var chalk = require('chalk'); // 为打印信息加上样式


var symbols = require('log-symbols'); // 在输出信息前面加上 A x等图标


var tmls = require('./utils/temp');

program.version('1.0.6', '-v, --version').command('create <name>').action(function (name) {
  // 命令行交互
  inquirer.prompt([{
    name: 'version',
    message: 'version(1.0.0)'
  }, {
    name: 'description',
    message: 'description'
  }, {
    name: 'author',
    message: 'author'
  }, {
    type: 'list',
    name: 'preset',
    message: 'Please pick a preset:',
    choices: [{
      name: 'Default (Vue2)',
      value: 'vue2'
    }, {
      name: 'Default (Vue3)',
      value: 'vue3'
    }]
  }]).then(function (answer) {
    var loading = ora('The template is being downloaded ...');
    loading.start();
    download("".concat(tmls[answer.preset]), name, {}, function (err) {
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
          author: answer.author
        };

        if (fs.existsSync(fileName)) {
          var content = fs.readFileSync(fileName).toString();
          var result = handlebars.compile(content)(meta);
          fs.writeFileSync(fileName, result);
        }

        console.log(symbols.success, chalk.green('Done'));
        console.log(chalk.blue("try run:"));
        console.log(chalk.red("cd ".concat(name)));
        console.log(chalk.red("npm install"));
      }
    });
  });
});
program.parse(process.argv);