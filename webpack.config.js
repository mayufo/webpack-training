let path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
      // 别名
      // alias: {
      //     loader1: path.resolve(__dirname, 'loader', 'loader1')
      // }
        modules: ['node_modules', path.resolve(__dirname, 'loader')]  // 先找node_modules, 再去loader中去找
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: [path.resolve(__dirname, 'loader', 'loader1')]
                use: 'loader1' // 如何找到这个loader1

            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         path.resolve(__dirname, 'loader', 'style-loader'),
            //         path.resolve(__dirname, 'loader', 'less-loader')
            //     ]
            // }
        ]
    },
}
