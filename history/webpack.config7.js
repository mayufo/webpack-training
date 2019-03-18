let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry:  {
      index: './src/index',
      other: './src/other',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist4')
    },
    optimization: {
        splitChunks: {  // 分割代码块，针对多入口
            cacheGroups: {   // 缓存组
                common: {   // 公共模块
                    minSize: 0,  // 大于多少抽离
                    minChunks: 2,  // 使用多少次以上抽离抽离
                    chunks: 'initial'  // 从什么地方开始,刚开始
                },
                vendor: {
                    priority: 1, // 增加权重
                    test: /node_modules/,
                    minSize: 0,  // 大于多少抽离
                    minChunks: 2,  // 使用多少次以上抽离抽离
                    chunks: 'initial'  // 从什么地方开始,刚开始
                }
            }
        },
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'   // 如果没有dist会查找内存中的
    },
    module: {
        noParse: /jquery/, // 不用解析某些包的依赖
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                include: path.resolve('src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),

    ]
}
