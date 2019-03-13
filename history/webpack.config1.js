let path = require('path')   // 相对路径变绝对路径
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
let webpack = require('webpack')

module.exports = {
    mode: 'production', // 模式 默认 production development
    entry: './src/index',
    output: {
        filename: 'bundle.[hash:8].js',   // hash: 8只显示8位
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://www.mayufo.cn'
    },
    // 从输出的bundle 中排除依赖
    externals: {
      jquery: 'jQuery'
    },
    devServer: {
        port: 3000,
        progress: true    // 滚动条
        // contentBase: ''  // 起服务的地址
        // open: true    // 自动打开浏览器
        // compress： true   // 压缩
    },
    plugins: [  // 放所有webpack插件
        // 将html模板复制到输出的文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,   // 删除html中的双引号
                // collapseWhitespace: true, // 折叠为一行
                hash: true   // 防止缓存
            }
        }),
        // 压缩css
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        // 提供插件, 每个模块都注入$符号, 不是全局
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ],
    optimization: {   // 优化项目
        minimizer: [
            new UglifyJsPlugin({     // 优化js
                cache: true,   // 是否缓存
                parallel: true,   // 是否并发
                // sourceMap: true // 源码映射 set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})    // css 的优化
        ]
    },
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
            },
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
            },
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
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            }
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // }
        ]
    }
}
