// 模板数据
const templates = {
  "vue2": 'ForeverGuo/uniapp-template-vue2#master',
  "vue3": 'ForeverGuo/uniapp-template-vue3#master'
}

// 配置 eslint + prettier 依赖
const eslint = {
  "devDependencies": {
    "@vue/cli-plugin-eslint": "^4.5.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.8.0",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-vue": "^6.2.2",
    "prettier": "^2.2.1"
  }
}

/*
 配置 husky 依赖
 version: > 4.x
 步骤：
  1 npm install husky --save-dev 安装
  2 npx husky install 手动启用husky
  3 npx husky add .husky/pre-commit "npm run lint-staged" 生成husky配置文件（执行完这一步，根目录会有一个 .husky目录）
  完成这三步便可以正常使用了（前提是package.json里面的lint-staged已经配置好了）

  为了解决每次手动启用 husky，在 package.json scripts 中添加 "prepare": "husky install"

**/
const husky = {
  "devDependencies": {
    "husky": "^8.0.1",  
    "lint-staged": "^10.5.4",
    "pre-commit": "^1.2.2",
  },
  "scripts": {
    "prepare": "husky install",
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
    "*.{js,vue}": [
      "prettier --write",
      "eslint --fix",
      "git add -A"
    ]
  }
}

module.exports = {
  templates,
  eslint_json: eslint,
  husky_json: husky
}