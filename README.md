
## 代码结构
```
├── admin                      // 打包产出文件
├── node_module                // npm加载所需的项目依赖模块
├── public                     // 静态入口
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体 图片等静态资源
│   ├── common                 // 全局公用配置
│   │   ├── config             // 配置全局路由权限和错误捕获
│   │   ├── mixin              // 一些vue公用的mixin
│   │   ├── js                 // 编写公有的方法
│   │   └── style              // 编写公有的样式
│   ├── components             // 全局公用组件
│   ├── directive              // 自定义指令
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── views                  // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── vue.config.js              // vue-cli@3.0+ 配置文件
└── package.json               // package.json
```


## 功能相关介绍
|模块|功能|页面编码|描述|
|:---|:--|:------|:---|

## 基本业务分析