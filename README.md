最好的webpack教程，看文档

[webpack](https://webpack.docschina.org/)
## 安装前先npm初始化
```
npm init -y
npm i webpack webpack-cli -D
```


```js
let path = require('path')   // 相对路径变绝对路径

module.exports = {
    mode: 'production', // 模式 默认 production development
    entry: './src/index',    // 入口
    output: {
        filename: 'bundle.[hash:8].js',   // hash: 8只显示8位
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://www.mayufo.cn'  // // 给所有打包文件引入时加前缀，包括css，js，img，如果只想处理图片可以单独在url-loader配置中加publicPath
    }
}
```
## 本地服务

`npm i webpack-dev-server -D`

```
devServer: {
    port: 3000,
    progress: true    // 滚动条
    // contentBase: ''  // 起服务的地址
    // open: true    // 自动打开浏览器
    // compress： true   // 压缩
}
```


## 复制html

`npm i html-webpack-plugin -D`

```
let HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [ // 放着所有webpack插件
    new HtmlWebpackPlugin({ // 用于使用模板打包时生成index.html文件，并且在run dev时会将模板文件也打包到内存中
      template: './index.html', // 模板文件
      filename: 'index.html', // 打包后生成文件
      hash: true, // 添加hash值解决缓存问题
      minify: { // 对打包的html模板进行压缩
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 折叠空行变成一行
      }
    })
]

```

[html-webpack-plugin#options](https://github.com/jantimon/html-webpack-plugin#options)


## 处理css

`npm i css-loader style-loader -D`

```
module: {    // 模块
        rules: [   // 规则
            // style-loader 把css插入head标签中
            // loader 功能单一
            // 多个loader 需要 []
            // 顺便默认从右到左
            // 也可以写成对象方式
            {
                test: /\.css$/,   // css 处理
                // use: 'css-loader'
                // use: ['style-loader', 'css-loader'],
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader', // css-loader 用来解析@import这种语法,
                    'postcss-loader'
                ]
            }
        ]
}
```

## 处理less

`npm i less-loader`

```
{
    test: /\.less$/,   // less 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,   // 这样相当于抽离成一个css文件， 如果希望抽离成分别不同的css, 需要再引入MiniCssExtractPlugin，再配置
        'css-loader', // css-loader 用来解析@import这种语法
        'postcss-loader',
        'less-loader' // less-loader less -> css
        // sass node-sass sass-loader
        // stylus stylus-loader
    ]
}
```

## 抽离css文件，通过link引入

`yarn add mini-css-extract-plugin -D`

[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

```
let MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩css

plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/main.css'
    })
]

{
    test: /\.css$/,   // css 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,   // 抽离
        'css-loader', // css-loader 用来解析@import这种语法,
        'postcss-loader'
    ]
}

```

抽离css插件文件时可使用`optimize-css-assets-webpack-plugin`优化压缩css以及js文件

## 压缩css和js

```
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

optimization: {   // 优化项目
    minimizer: [
        new UglifyJsPlugin({     // 优化js
            cache: true,   // 是否缓存
            parallel: true,   // 是否并发
            // sourceMap: true // 源码映射 set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})    // css 的优化
    ]
}

```

## 给css加上兼容浏览器的前缀

`yarn add postcss-loader autoprefixer -D`

```
// css
{
    test: /\.css$/,   // css 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,
        'css-loader', // css-loader 用来解析@import这种语法,
        'postcss-loader'
    ]
}
// less
{
    test: /\.less$/,   // less 处理
    // use: 'css-loader'
    // use: ['style-loader', 'css-loader'],
    use: [
        // {
        //     loader: 'style-loader',
        //     options: {
        //         insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
        //     }
        // },
        MiniCssExtractPlugin.loader,   // 这样相当于抽离成一个css文件， 如果希望抽离成分别不同的css, 需要再引入MiniCssExtractPlugin，再配置
        'css-loader', // css-loader 用来解析@import这种语法
        'postcss-loader',
        'less-loader' // less-loader less -> css
        // sass node-sass sass-loader
        // stylus stylus-loader
    ]
},
```

postcss 需要配置文档   `postcss.config1.js`

[postcss-loader](https://github.com/postcss/postcss-loader)

```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```




## es6 转 es5

`npm i babel-loader @babel/core  @babel/preset-env -D`

```
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins:[
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
            ]
        }
    }
}
```


## es 7的语法
```
// class
npm i @babel/plugin-proposal-class-properties -D
// 装饰器
npm i @babel/plugin-proposal-decorators -D
```
配置如上

## 全局变量引入

jquery的引入

```
npm i jquery -S
```

```
let webpack = require('webpack')

new webpack.ProvidePlugin({
  $: 'jquery'
})
```

其他情况

1. 暴露全局

`npm i expose-loader -D` 暴露全局的loader

可以在js中 `import $ from 'expose-loader?$!jquery'`   // 全局暴露jquery为$符号

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

2. 如何在每个模块中注入

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
3. `<img src="">`

`yarn add file-loader -D`

适合一二情况

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

默认会内部生成一张图片到build,生成图片的路径返回回来

第一种情况: 图片地址要`import`引入，直接写图片的地址，会默认为字符串

```
import logo from './logo.png'

console.log(logo)
let image = new Image()

image.src = logo

document.body.appendChild(image)
```

第二种情况: `css-loader`会将`css`里面的图片转为`require`的格式

```
div {
    background: url("./logo.png");
   }
```

第三种情况: 解析html中的image

`yarn add html-withimg-loader -D`

```
{
    test: /\.html$/,
    use: 'html-withimg-loader'
}
```

## 当图片小于多少，用base64

`yarn add url-loader -D`

如果过大，才用file-loader

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
            outputPath: 'img/'   // 打包后输出地址 在dist/img
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
    publicPath: 'http://www.mayufo.cn'  // 给静态资源统一加
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

`yarn add @babel/core  @babel/preset-env babel-loader  webpack-dev-server -D`

`devtool: 'source-map'` // 增加映射文件调试源代码

1. 源码映射 会标识错误的代码 打包后生成独立的文件 大而全 「source-map」
2. 不会陈胜单独的文件 但是可以显示行和列  「evl-source-map」
3. 不会产生列，产生单独的映射文件  「cheap-module-source-map」
4. 不会产生文件 集成在打包后的文件中 不会产生列 「cheap-module-eval-source-map」


## watch 改完代表重新打包实体

```
watch: true,
watchOptions: {
    poll: 1000,   // 每秒检查一次变动
    aggregateTimeout: 300,  // 当第一个文件更改，会在重新构建前增加延迟
    ignored: /node_modules/  // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，
},
```


## webpack的其他三个小插件

1. cleanWebpackPlugin

每次打包之前删掉dist目录
`yarn add clean-webpack-plugin -D`

[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)

```
const CleanWebpackPlugin = require('clean-webpack-plugin');
output: {
    path: path.resolve(process.cwd(), 'dist'),
},
plugins: [
    new CleanWebpackPlugin()
]
```
2. copyWebpackPlugin
一些静态资源也希望拷贝的dist中
`yarn add copy-webpack-plugin -D`
```
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  plugins: [
     new CopyWebpackPlugin([
    {from: './src/doc', to: './public'}
    ])
  ]
}
```
3. bannerPlugin  内置模块

版权声明

```
const webpack = require('webpack');

new webpack.BannerPlugin('hello world')
// or
new webpack.BannerPlugin({ banner: 'hello world'})

```

## webpack 跨域

设置一个服务,由于`webpack-dev-server`内含`express`

[express](https://expressjs.com/zh-cn/starter/hello-world.html)

`server.js`
```
// express

let express = require('express')

let app = express();


app.get('/api/user', (res) => {
    res.json({name: 'mayufo'})
})


app.listen(3000)   // 服务端口在3000
```

写完后记得node server.js

访问 `http://localhost:3000/api/user` 可见内容



`index.js`

```
// 发送一个请求
let xhr = new XMLHttpRequest();

// 默认访问 http://localhost:8080  webpack-dev-server 的服务 再转发给3000
xhr.open('GET', '/api/user', true);

xhr.onload = function () {
    console.log(xhr.response)
}

xhr.send();

```


`webpack.config.js`
```
devServer: {
  proxy: {
      '/api': 'http://localhost:3000' // 配置一个代理
  }
},
```

## 如果后端给的请求没有API 「跨域」

```
// express

let express = require('express')

let app = express();


app.get('/user', (res) => {
    res.json({name: 'mayufo'})
})


app.listen(3000)   // 服务端口在3000
```


请求已api开头, 转发的时候再删掉api
```
devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            pathRewrite: {'^/api': ''}
        }
    }
}
```

## 前端只想单纯mock数据 「跨域」
```
devServer: {
    // proxy: {
    //     '/api': 'http://localhost:3000' // 配置一个代理
    // }
    //   proxy: {   // 重写方式 把请求代理到express 上
    //       '/api': {
    //           target: 'http://localhost:3000',
    //           pathRewrite: {'^/api': ''}
    //       }
    //   }
    before: function (app) {  // 勾子
        app.get('/api/user', (req, res) => {
            res.json({name: 'mayufo - before'})
        })
    }
},
```

## 有服务端，不用代理, 服务端启动webpack 「跨域」

`server.js`中启动`webpack`

`yarn add webpack-dev-middleware -D`

`server.js`

```
// express

let express = require('express')
let webpack = require('webpack')
let app = express();


// 中间件
let middle = require('webpack-dev-middleware')

let config = require('./webpack.config')


let compiler = webpack(config)


app.use(middle(compiler))

app.get('/user', (req, res) => {
    res.json({name: 'mayufo'})
})


app.listen(3000)

```

## webpack解析resolve

以bootstrap为例

```
npm install bootstrap  -D
```

`index.js`

```
import 'bootstrap/dist/css/bootstrap.css'
```

报错
```
ERROR in ./node_modules/bootstrap/dist/css/bootstrap.css 7:0
Module parse failed: Unexpected token (7:0)
You may need an appropriate loader to handle this file type.
|  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
|  */
> :root {
|   --blue: #007bff;
|   --indigo: #6610f2;
 @ ./src/index.js 22:0-42
 @ multi (webpack)-dev-server/client?http://localhost:8081 ./src/index.js

```

这是因为bootstrap 4.0的css引入了新的特性，CSS Variables

安装
`npm install postcss-custom-properties --save-dev`


配置`webpack.config.js`
```
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require("postcss-custom-properties")
            ]
        }
    }]
}
```

## 但是每次引入都很长，如何优雅引入
```
resolve: {
    // 在当前目录查找
    modules: [path.resolve('node_modules')],
    alias: {
        'bootstrapCss': 'bootstrap/dist/css/bootstrap.css'
    }
},
```

```
import 'bootstrapCss'  // 在node_modules查找
```

## 省略扩展名

```
resolve: {
    // 在当前目录查找
    modules: [path.resolve('node_modules')],
    // alias: {
    //     'bootstrapCss': 'bootstrap/dist/css/bootstrap.css'
    // },
    mainFields: ['style', 'main'],   // 先用bootstrap中在package中的style,没有在用main
    // mainFiles: []  // 入口文件的名字 默认index
    extensions: ['.js', '.css', '.json']  // 当没有拓展命的时候，先默认js、次之css、再次之json
},
```
