let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry:  {
      index: './src/index'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist4')
    },
    devServer: {
        hot: true,   // 启动热更新
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
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import'
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
        new webpack.NamedModulesPlugin(), // 那个模块更新
        new webpack.HotModuleReplacementPlugin()  // 热更新插件
    ]
}
