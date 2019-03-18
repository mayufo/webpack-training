let path = require('path')
let webpack = require('webpack')
module.exports = {
    mode: 'development',
    entry: {
        // test: './src/test.js'
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js',  // 产生的文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]',     // 给输出的结果加个名字
        // libraryTarget: 'var'   // 配置如何暴露 library
        // commonjs 结果放在export属性上， umd统一资源模块, 默认是var
    },
    plugins: [
       new webpack.DllPlugin({
           name: '_dll_[name]',  // name === library
           path: path.resolve(__dirname, 'dist', 'manifest.json')
       })
    ]
}
