"use strict";

var chalk = require("chalk"); // 为打印信息加上样式


var ora = require("ora"); // 加载提示


var symbols = require("log-symbols"); // 在输出信息前面加上 A x等图标


var figlet = require("figlet");

var log = console.info;
/*
 *@Description: 特殊符号输出
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 10:35:23
 */

var specialSymbol = function specialSymbol() {
  log(figlet.textSync('hello uniapp'));
};

module.exports = {
  chalk: chalk,
  ora: ora,
  symbols: symbols,
  figlet: figlet,
  log: log,
  specialSymbol: specialSymbol
};