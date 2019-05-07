# vue_duo_ru_kou

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
|——build：// 打包文件
|——config // config配置
|——src // 文件目录
|————assets // 公共资源文件
|————components // 公共公有组件
|————router //公共公有路由
|————view // 多页面入口视图层
|——————audit // 审批页面入口
|————————pages //单页面内的页面文件
|————————router //单页面内的路由文件
|————————audit.html // 单页面内的入口html，每新增一个单页面，html文件名需保持一致
|————————audit.js // 单页面内的入口js，每新增一个单页面，js文件名需保持一致
|————————Audit.vue // 单页面内的入口vue，每新增一个单页面，vue文件名需保持一致
|——static // 静态文件
|——package.json //  文件依赖