module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // eslint 与 prettier 冲突 使用 prettier eslint:recommended
  extends: ['plugin:vue/essential', 'plugin:vue/recommended', 'plugin:prettier/recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 自定义规则配置
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 2,
    indent: [2, 2]
  }
}
