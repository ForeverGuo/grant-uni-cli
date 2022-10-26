// 默认选项
const default_prompts = [
  {
    name: 'version',
    message: 'version(1.0.0)'
  },
  {
    name: 'description',
    message: 'description'
  },
  {
    name: 'author',
    message: 'author'
  },
  {
    type: 'list',
    name: 'preset',
    message: 'Please pick a preset:',
    choices: [
        {
            name: 'Vue2 (HbuilderX 开发)',
            value: 'vue2-hbx',
        },
        {
          name: 'Vue2 (CLI 版本)',
          value: 'vue2-cli',
        },
        {
            name: 'Vue3 + TS (HbuilderX 开发)',
            value: 'vue3-hbx',
        },
        {
          name: 'Vue3 + TS (CLI 版本)',
          value: 'vue3-cli',
        }
    ]
  }
]

// eslint 选项
const eslint_prompts = [
  {
    type: 'list',
    name: 'lint',
    message: 'Please pick an ESLint preset:',
    choices: [
        {
            name: 'none',
            value: 'none',
        },
        {
            name: 'Eslint + Prettier ( 代码规范控制 vscode 开发 )',
            value: 'eslint',
        }
    ]
  },
  {
    type: 'list',
    name: 'husky',
    message: 'Please pick a husky:',
    choices: [
        {
            name: 'none',
            value: 'none',
        },
        {
            name: 'husky ( git hook 代码检查, 需与 eslint 配合使用 vscode开发 )',
            value: 'husky',
        }
    ]
  }
]

module.exports = {
  default_prompts,
  eslint_prompts
}
