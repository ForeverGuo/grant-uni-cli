const download = require("download-git-repo");
const { templates } = require("./utils/config");
const { log, chalk, ora, symbols } = require("./utils/log");
const { npmVersion } = require('./utils/config')
/*
 *@Description: download 下载包
 *@MethodAuthor: grantguo
 *@Date: 2022-10-21 18:52:28
 */
function downloadInit(fn, preset, meta, prompts) {
  const loading = ora("The template is loading ...");
  loading.start();
  const { name } = meta;
  download(`${templates[preset]}`, name, {}, (err) => {
    log(err ? "Error" : "Success");
    if (err) {
      loading.fail();
      log(symbols.error, chalk.red(err));
    } else {
      loading.succeed();
      // 处理逻辑
      if (fn) {
        fn(preset, meta, prompts);
      }
      // success log
      finalLog(preset, meta);
    }
  });
}

/**
 * @description 模版下载成功提示
 * @author grantguo
 * @date 2022-10-23 12:33:33
 */
function finalLog(preset, meta) {
  const { name } = meta;
  log(symbols.success, chalk.green("Done"));
  log(
    chalk.blue(
      `   \n     欢迎使用 uniapp 脚手架 \n\n      当前版本 ${npmVersion} \n`
    )
  );
  log(chalk.greenBright(`     1  cd ${name} \n`));
  log(chalk.greenBright(`     2  npm install \n`));
  if (preset.includes("hbx")) {
    log(chalk.yellow(`    Please run in HBuilderX \n`));
  } else {
    log(chalk.greenBright(`     3  npm run dev \n`));
    log(chalk.yellow(`    HBuilderX OR VScode \n`));
  }
}

module.exports = downloadInit

