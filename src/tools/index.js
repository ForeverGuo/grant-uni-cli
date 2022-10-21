const chalk = require('chalk')  // 为打印信息加上样式
const ora = require('ora')  // 加载提示
const symbols = require('log-symbols')  // 在输出信息前面加上 A x等图标
const boxen = require('boxen')
const log = console.info

/*
 *@Description: 特殊符号输出
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 10:35:23
*/
const specialSymbol = () => {
  log(boxen(chalk.yellow.bold("HELLO UNIAPP"), {
    title: chalk.red.bold("WELCOME"),
    titleAlignment: 'center',
    height: 4,
    padding: 2,
    borderStyle: 'classic'
  }))
}

module.exports = {
  chalk,
  ora,
  symbols,
  boxen,
  log,
  specialSymbol
}