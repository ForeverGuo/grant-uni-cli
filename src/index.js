const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ora = require('ora')  // 加载提示
const chalk = require('chalk')  // 为打印信息加上样式
const symbols = require('log-symbols')  // 在输出信息前面加上 A x等图标

const { templates, eslint_json, husky_json } = require('./utils/config')

const pipe = require('./utils/pipe')

const package = require('./files/package')
const prompt = require('./utils/prompt')
const initEslint = require('./utils/eslint')

const log = console.log


log(eslint_json)

log(__dirname)

           const meta = {
                name: '11',
                description: '',
                version: '1.0.0',
                author: '',
                devDependencies: {}
              }


Object.assign(meta, eslint_json)
const dd = JSON.parse(JSON.stringify(meta))
Object.assign(dd, husky_json)


fs.writeFileSync('./test001/package.json', JSON.stringify(dd, null, '\t'))

program.version('1.0.6', '-v, --version')
  .command('create <name>')
  .action((name) => {
    // 命令行交互
    inquirer.prompt(prompt).then(answer => {
      // const loading = ora('The template is being downloaded ...')
      // loading.start()
      // download(`${templates[answer.preset]}`, name, {}, (err) => {
      //       console.log(err ? 'Error' : 'Success')
      //       if(err) {
      //         loading.fail()
      //         console.log(symbols.error, chalk.red(err))
      //       } else {
      //         loading.succeed()
      //         const fileName = `${name}/package.json`
      //         const meta = {
      //           name,
      //           description: answer.description,
      //           version: answer.version || '1.0.0',
      //           author: answer.author,
      //           devDependencies: {}
      //         }
      //         if(answer.lint === 'eslint') {
      //           initEslint(name)
      //           Object.assign(meta, eslint_json)
      //         }

      //         if(answer.husky === 'husky') {
      //           Object.assign(meta, husky_json)
      //         }

      //         Object.assign(package, meta)
      //         if(fs.existsSync(fileName)) {
      //           // const content = fs.readFileSync(fileName).toString()
      //           // const result = handlebars.compile(content)(meta)
      //           // fs.writeFileSync(fileName, result)
      //           fs.writeFileSync(fileName, JSON.stringify(package, null, '\t'))
      //         }
      //         console.log(symbols.success, chalk.green('Done'))
      //         console.log(chalk.blue(`try run:`))
      //         console.log(chalk.red(`cd ${name}`))
      //         console.log(chalk.red(`npm install`))
      //       }
      // })
    })
  })

program.parse(process.argv)
