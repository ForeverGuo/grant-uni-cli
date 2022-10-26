const fs = require("fs")
const handlebars = require('handlebars')
/*
 *@Description: CLI 包初始化
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 18:45:03
 */
function cliInit(preset, meta, ans) {
  const { name } = meta;
  const fileName = `${name}/package.json`;
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(fileName, result);
  }
}

module.exports = cliInit