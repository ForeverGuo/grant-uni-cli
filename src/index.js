const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const fs = require("fs");

const _ = require("lodash");
const shell = require("shelljs");

const { log, specialSymbol, chalk, ora, symbols } = require("./tools/index");

const { templates, eslint_json, husky_json } = require("./utils/config");
const { default_prompts, eslint_prompts } = require("./utils/prompt");

const packageFn = require("./utils/package");
const initEslint = require("./utils/eslint");

log("8888888888888888888888888");

program
  .version("1.1.2", "-v, --version")
  .command("create <name>")
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

      if (preset == 'vue2-hbx') {
        const eslint_inquirer = inquirer.prompt(eslint_prompts)
        eslint_inquirer.then(res => {
          downloadInit(hbuilderInit, preset, meta, res)
        })
      }

      if (preset.includes('cli')) {
        downloadInit(null, preset, meta)
      }

    });

    // inquirer.prompt(prompt).then(answer => {
    //   const loading = ora('The template is loading ...')
    //   loading.start()
    //   const { preset, version, description, author, lint, husky } = answer
    //   const packageObj = packageFn(preset)

    //   download(`${templates[preset]}`, name, {}, (err) => {
    //         log(err ? 'Error' : 'Success')
    //         if(err) {
    //           loading.fail()
    //           log(symbols.error, chalk.red(err))
    //         } else {
    //           loading.succeed()
    //           const fileName = `${name}/package.json`
    //           const meta = {
    //             name,
    //             description: description,
    //             version: version || '1.0.0',
    //             author: author,
    //             devDependencies: {}
    //           }
    //           if(lint === 'eslint') {
    //             initEslint(name)
    //            _.merge(meta, eslint_json)
    //           }

    //           if(husky === 'husky') {
    //             // if(!fs.existsSync(`./${name}/.husky`)) {
    //             //   fs.mkdirSync(`./${name}/.husky`);  // 创建.husky
    //             //   shell.exec(`cd ./${name} && git init`)
    //             // }
    //             shell.exec(`cd ./${name} && git init`)
    //             _.merge(meta, husky_json)
    //           }

    //           _.merge(packageObj, meta)
    //           if(fs.existsSync(fileName)) {
    //             fs.writeFileSync(fileName, JSON.stringify(packageObj, null, '\t'))
    //           }
    //           log(symbols.success, chalk.green('Done'))
    //           log(chalk.blue(`   \n     欢迎使用 uniapp 脚手架 \n\n      当前版本 1.1.2 \n`))
    //           log(chalk.red(`     1  cd ${name} \n`))
    //           log(chalk.red(`     2  npm run init \n`))
    //           log(chalk.yellow(`    Please run in HBuilder X \n`))
    //         }
    //   })
    // })
  });

  /*
   *@Description: HbuilderX 包初始化
   *@MethodAuthor: grantguo
   *@Date: 2022-10-21 18:44:36
  */
  function hbuilderInit(preset, meta, prompts) {
    const { name } = meta
    const { lint, husky } = prompts
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
    if(fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, JSON.stringify(packageObj, null, '\t'))
    }
  }

  /*
   *@Description: CLI 包初始化
   *@MethodAuthor: grantguo
   *@Date: 2022-10-21 18:45:03
  */
  function cliInit() {

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
        // -----
        log(symbols.success, chalk.green('Done'))
        log(chalk.blue(`   \n     欢迎使用 uniapp 脚手架 \n\n      当前版本 1.1.2 \n`))
        log(chalk.red(`     1  cd ${name} \n`))
        log(chalk.red(`     2  npm run init \n`))
        log(chalk.yellow(`    Please run in HBuilder X \n`))
      }
    })
  }


program.parse(process.argv);
