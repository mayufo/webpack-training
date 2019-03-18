let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
let Happypack = require('happypack')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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
                use: 'happypack/loader?id=js'
            },
            {
                test: /\.css$/,
                use: 'happypack/loader?id=css'
            }
        ],
    },
    plugins: [
        new Happypack({
            id: 'js',
            user: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }]
        }),
        new Happypack({
            id: 'css',
            user: ['style-loader', 'css-loader']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}
