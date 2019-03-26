let path = require('path')
let DonePlugin = require('./plugins/DonePlugins')
let AsyncPlugins = require('./plugins/AsyncPlugins')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FileListPlugin = require('./plugins/FileListPlugin')

let InlineSourcePlugins = require('./plugins/InlineSourcePlugins')

let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let UploadPlugin = require('./plugins/UploadPlugin')
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://poyrjyh1b.bkt.clouddn.com/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        // new DonePlugin(),
        // new AsyncPlugins(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new UploadPlugin({
            bucket: 'test',  // 七牛的存储空间
            domain: 'poyrjyh1b.bkt.clouddn.com',
            accessKey: 'W7UjMPdRJ55nZkO3r7giF2ZACvP1PU8CbynMg_t0', // 七牛云的两对密匙
            secretKey: 'vj9_-G9TgSkiI4FrZfpYDW299btwMaH0-jgP-BIb' // 七牛云的两对密匙
        })
        // new InlineSourcePlugins({
        //     match: /\.(js|css)/
        // }),
        // new FileListPlugin({
        //     filename: 'list.md'
        // })
    ]
}
