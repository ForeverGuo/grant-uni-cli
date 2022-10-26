### grant-uniapp-cli

```js
  npm install -g grant-uniapp-cli

  uniapp create my-project
```

### 目录

  |—— bin           --------  执行文件
      |—— inde.js
  |—— dist          --------  打包文件
  |—— files         --------  配置使用文件
  |—— src           --------  源文件
      |
      |-- utils     --------  工具集（log输出, 读写文件等）
      |
      |-- createCli --------  创建 node 版本
      |
      |-- createHbx --------  创建 HbuilderX 版本
      |
      |-- download  --------  下载模板
      |
      |-- index.js  --------  入口文件
      |
  |—— babel.config  --------  babel配置
  |—— package.json  
  |—— readme.md