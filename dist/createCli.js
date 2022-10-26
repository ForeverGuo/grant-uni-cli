"use strict";

var fs = require("fs");

var handlebars = require('handlebars');
/*
 *@Description: CLI 包初始化
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 18:45:03
 */


function cliInit(preset, meta, ans) {
  var name = meta.name;
  var fileName = "".concat(name, "/package.json");

  if (fs.existsSync(fileName)) {
    var content = fs.readFileSync(fileName).toString();
    var result = handlebars.compile(content)(meta);
    fs.writeFileSync(fileName, result);
  }
}

module.exports = cliInit;