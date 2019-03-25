// 拿到babel的参数 需要工具 loaderUtils
let loaderUtils = require('loader-utils')

function loader(source) {  // loader的参数就是源代码
    // file-loader需要返回路径
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {content: source })
    this.emitFile(filename, source) // 发射文件
    console.log('loader1');
    return `module.exports="${filename}"`
}
loader.raw = true // 二进制
module.exports = loader
