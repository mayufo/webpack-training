let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        home: './src/index.js'
    },
    output: {
        filename: "[name]1.js",
        path: path.resolve(process.cwd(), 'dist3')
    },
    devtool: 'source-map', // 增加映射文件调试源代码
    // 1. 源码映射 会标识错误的代码 打包后生成独立的文件 大而全 「source-map」
    // 2. 不会陈胜单独的文件 但是可以显示行和列  「evl-source-map」
    // 3. 不会产生列，产生单独的映射文件  「cheap-module-source-map」
    // 4. 不会产生文件 集成在打包后的文件中 不会产生列 「cheap-module-eval-source-map」
    watch: true,
    watchOptions: {
        poll: 1000,   // 每秒检查一次变动
        aggregateTimeout: 300,  // 当第一个文件更改，会在重新构建前增加延迟
        ignored: /node_modules/  // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {from: './src/doc', to: './public'}
            ]),
        new webpack.BannerPlugin('make 2019 by mayufo')
    ]
}
