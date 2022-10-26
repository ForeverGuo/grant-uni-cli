const program = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
const { log, specialSymbol, chalk, symbols } = require("./utils/log");
const { templates, npmVersion } = require("./utils/config");
const { default_prompts, eslint_prompts } = require("./utils/prompt");
const downloadInit = require('./download')
const cliInit = require('./createCli')
const hbuilderInit = require('./createHbx')

program
  .option('-l, --list', '查看可用模版列表')
  .action(() => {
    log(templates)
  })

program
  .version(npmVersion, "-v, --version") //  设置版本号
  .command("create <name>") // 设置指令交互
  .description("创建项目")  // 指令的描述
  .action((name) => {   // 创建项目名称
    specialSymbol();
    if (fs.existsSync(name)) {
      log(symbols.error, chalk.red('当前文件已存在~'))
      return
    }
    // 默认选项
    const default_inquirer = inquirer.prompt(default_prompts);  // 输出交互指令
    default_inquirer.then((ans) => {  
      const { preset, version, description, author } = ans; // 输出用户的结果
      const meta = {  // 创建对象来配置生成文件
        name,
        description: description,
        version: version || "1.0.0",
        author: author,
        devDependencies: {},
      };
      if (preset === 'vue2-hbx') {  // vue2 版本 + eslint + husky 配置选项
        const eslint_inquirer = inquirer.prompt(eslint_prompts)
        eslint_inquirer.then(res => {
          downloadInit(hbuilderInit, preset, meta, res)
        })
      }
      if (preset === 'vue3-hbx') {  // vue3 版本 目前 eslint + husky 没有进行测试
        downloadInit(hbuilderInit, preset, meta, null)
      }
      if (preset.includes('cli')) { //  node 版本
        downloadInit(cliInit, preset, meta,  null)
      }
    });
  });

program.parse(process.argv);  // 参数解析
