let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist4')
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
