const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ora = require('ora')  // 加载提示
const chalk = require('chalk')  // 为打印信息加上样式
const symbols = require('log-symbols')  // 在输出信息前面加上 A x等图标
const _ = require('lodash')
const shell = require('shelljs')

const { templates, eslint_json, husky_json } = require('./utils/config')

const pipe = require('./utils/pipe')

const packageFn = require('./utils/package')
const prompt = require('./utils/prompt')
const initEslint = require('./utils/eslint')

const log = console.log

program.version('1.0.9', '-v, --version')
  .command('create <name>')
  .action((name) => {
    // 命令行交互
    inquirer.prompt(prompt).then(answer => {
      const loading = ora('The template is loading ...')
      loading.start()
      const { preset, version, description, author, lint, husky } = answer
      const packageObj = packageFn(preset)

      download(`${templates[preset]}`, name, {}, (err) => {
            console.log(err ? 'Error' : 'Success')
            if(err) {
              loading.fail()
              console.log(symbols.error, chalk.red(err))
            } else {
              loading.succeed()
              const fileName = `${name}/package.json` 
              const meta = {
                name,
                description: description,
                version: version || '1.0.0',
                author: author,
                devDependencies: {}
              }
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
              console.log(symbols.success, chalk.green('Done'))
              log(chalk.blue(`   \n     欢迎使用 uniapp 脚手架 \n\n      当前版本 1.0.9 \n`))
              log(chalk.red(`     1  cd ${name} \n`))
              log(chalk.red(`     2  npm run init \n`))
              log(chalk.yellow(`    Please run in HBuilder X \n`))
            }
      })
    })
  })

program.parse(process.argv)
