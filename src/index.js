const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const fs = require("fs");
const handlebars = require('handlebars')
const _ = require("lodash");
const shell = require("shelljs");

const { log, specialSymbol, chalk, ora, symbols } = require("./tools/index");

const { templates, eslint_json, husky_json } = require("./utils/config");
const { default_prompts, eslint_prompts } = require("./utils/prompt");

const packageFn = require("./utils/package");
const initEslint = require("./utils/eslint");
// 但前包版本
const npmVersion = '1.1.3'

program
  .option('-l, --list', '查看可用模版列表')
  .action(() => {
    log(templates)
  })

program
  .version(npmVersion, "-v, --version")
  .command("create <name>")
  .description("创建项目")
  .action((name) => {
    specialSymbol();
    // 默认选项
    const default_inquirer = inquirer.prompt(default_prompts);
    default_inquirer.then((ans) => {
      const { preset, version, description, author } = ans;
      const meta = {
        name,
        description: description,
        version: version || "1.0.0",
        author: author,
        devDependencies: {},
      };

      if (preset === 'vue2-hbx') {
        const eslint_inquirer = inquirer.prompt(eslint_prompts)
        eslint_inquirer.then(res => {
          downloadInit(hbuilderInit, preset, meta, res)
        })
      }

      if (preset === 'vue3-hbx') {
        downloadInit(hbuilderInit, preset, meta, null)
      }

      if (preset.includes('cli')) {
        downloadInit(cliInit, preset, meta,  null)
      }
    });
  });

  /*
   *@Description: HbuilderX 包初始化
   *@MethodAuthor: grantguo
   *@Date: 2022-10-21 18:44:36
  */
  function hbuilderInit(preset, meta, ans) {
    const { name } = meta
    const { lint, husky } = ans
    const fileName = `${name}/package.json`
    const packageObj = packageFn(preset)

    if(lint === 'eslint') {
      initEslint(name)
      _.merge(meta, eslint_json)
    }
    if(husky === 'husky') {
      // if(!fs.existsSync(`./${name}/.husky`)) {
      //   fs.mkdirSync(`./${name}/.husky`);  // 创建.husky
      //   shell.exec(`cd ./${name} && git init`)
      // }
      shell.exec(`cd ./${name} && git init`)
      _.merge(meta, husky_json)
    }
    _.merge(packageObj, meta)
    if (fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, JSON.stringify(packageObj, null, '\t'))
    }
  }

  /*
   *@Description: CLI 包初始化
   *@MethodAuthor: grantguo
   *@Date: 2022-10-21 18:45:03
  */
  function cliInit(preset, meta, ans) {
    const { name } = meta
    const fileName = `${name}/package.json`
    if (fs.existsSync(fileName)) {
      const content = fs.readFileSync(fileName).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(fileName, result)
    }
  }

  /*
   *@Description: download 下载包
   *@MethodAuthor: grantguo
   *@Date: 2022-10-21 18:52:28
  */
  function downloadInit(fn, preset, meta, prompts) {
    const loading = ora('The template is loading ...')
    loading.start()
    const { name } = meta
    download(`${templates[preset]}`, name, {}, (err) => {
      log(err ? 'Error' : 'Success')
      if (err) {
        loading.fail()
        log(symbols.error, chalk.red(err))
      } else {
        loading.succeed()
        // 处理逻辑
        if (fn) {
          fn(preset, meta, prompts)
        }
        // success log
        finalLog(preset, meta)
      }
    })
  }

  /**
   * @description 模版下载成功提示
   * @author grantguo
   * @date 2022-10-23 12:33:33
  */
  function finalLog(preset, meta) {
    const { name } = meta
    log(symbols.success, chalk.green('Done'))
    log(chalk.blue(`   \n     欢迎使用 uniapp 脚手架 \n\n      当前版本 ${npmVersion} \n`))
    log(chalk.greenBright(`     1  cd ${name} \n`))
    log(chalk.greenBright(`     2  npm install \n`))
    if (preset.includes('hbx')) {
      log(chalk.yellow(`    Please run in HBuilderX \n`))
    } else {
      log(chalk.greenBright(`     3  npm run dev \n`))
      log(chalk.yellow(`    HBuilderX OR VScode \n`))
    }
  }

program.parse(process.argv);
