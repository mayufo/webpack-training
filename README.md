## 安装前先npm初始化

npm init -y
npm i webpack webpack-cli -D

## 本地服务

npm i webpack-dev-server -D


## 复制html

npm i html-webpack-plugin -D

## 处理css

npm i css-loader style-loader -D

## 处理less

npm i less-loader

## 抽离css文件，通过link引入

yarn add mini-css-extract-plugin -D

https://github.com/webpack-contrib/mini-css-extract-plugin

## 给css加上兼容浏览器的前缀

yarn add postcss-loader autoprefixer -D

## es6 转 es5

npm i babel-loader @babel/core  @babel/preset-env -D


## es 7的语法

// class
npm i @babel/plugin-proposal-class-properties -D
// 装饰器
npm i @babel/plugin-proposal-decorators -D

## 全局变量引入

1. expose-loader 暴露全局的loader  内联的loader
pre 前面执行的loader normal 普通的loader 后置的loader

import $ from 'expose-loader?$!jquery'   // 全局暴露jquery为$符号

可以调用window.$

也可在webpack.config.js 中配置 rules
```
{
                test: require.resolve('jquery'),
                use: 'expose-loader?$'
            }
```

以后在.js文件中引入

```
import $ from 'jquery'
```

2. 如何在每个模块中注入$ ?

```
let webpack = require('webpack')

// 在plugins中配置
new webpack.ProvidePlugin({
    $: 'jquery'
})
```

3. 在index.html中通过script标签引入jquery, 但是在js中，用import会重新打包jquery,如何避免

从输出的bundle 中排除依赖

```
 externals: {
  jquery: 'jQuery'
 }
```

此时在index.js上

```
import $ from 'jquery'

console.log($, 123456)   // 可以正常运行
```

## webpack图片打包

1. js中创建
2. css中引入
3. <img src="">

yarn add file-loader -D
默认会内部生成一张图片到build,生成图片的路径返回回来
第一种情况，图片地址要import 引入，直接写图片的地址，会默认为字符串

第二种情况，css-loader会将css里面的图片转为require的格式

第三种情况 yarn add html-withimg-loader -D 解析html中的image

## 当图片小于多少，用base64
yarn add url-loader -D
如果过大，才用file-loader

## 打包文件分类

图片

```
 {
    test: /\.(png|jpg|gif)$/,
    // 当图片小于多少，用base64,否则用file-loader产生真实的图片
    use: {
        loader: 'url-loader',
        options: {
            limit: 1,  // 200k 200 * 1024
            outputPath: 'img/'   // 打包后输出地址
        }
    }
 },
```

css

```
plugins: [
 new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
]
```
## 希望输出的时候，给这些css\img加上前缀，传到服务器也能访问

```
output: {
    filename: 'bundle.[hash:8].js',   // hash: 8只显示8位
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://www.mayufo.cn'
},
```


## 如果只希望处理图片

```
{
    test: /\.(png|jpg|gif)$/,
    // 当图片小于多少，用base64,否则用file-loader产生真实的图片
    use: {
        loader: 'url-loader',
        options: {
            limit: 1,  // 200k 200 * 1024
            outputPath: '/img/',   // 打包后输出地址
            publicPath: 'http://www.mayufo.cn'
        }
    }
}
```

## 打包多页应用

```
// 多入口
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist2')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other', 'home']   // other.html 里面有 other.js & home.js
        }),
    ]
}

```

## 配置source-map

yarn add @babel/core  @babel/preset-env babel-loader  webpack-dev-server -D

devtool: 'source-map', // 增加映射文件调试源代码
    // 1. 源码映射 会标识错误的代码 打包后生成独立的文件 大而全 「source-map」
    // 2. 不会陈胜单独的文件 但是可以显示行和列  「evl-source-map」
    // 3. 不会产生列，产生单独的映射文件  「cheap-module-source-map」
    // 4. 不会产生文件 集成在打包后的文件中 不会产生列 「cheap-module-eval-source-map」


## watch 改完代表重新打包实体

```
    watch: true,
    watchOptions: {
        poll: 1000,   // 每秒检查一次变动
        aggregateTimeout: 300,  // 当第一个文件更改，会在重新构建前增加延迟
        ignored: /node_modules/  // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，
    },
```
