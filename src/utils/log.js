const chalk = require("chalk"); // 为打印信息加上样式
const ora = require("ora"); // 加载提示
const symbols = require("log-symbols"); // 在输出信息前面加上 A x等图标
const figlet = require("figlet");
const log = console.info;

/*
 *@Description: 特殊符号输出
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 10:35:23
 */
const specialSymbol = () => {
  log(figlet.textSync('hello uniapp'));
};

module.exports = {
  chalk,
  ora,
  symbols,
  figlet,
  log,
  specialSymbol,
};