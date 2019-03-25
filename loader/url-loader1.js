// 拿到babel的参数 需要工具 loaderUtils
let loaderUtils = require('loader-utils')
let mime = require('mime')

function loader(source) {  // loader的参数就是源代码
    let {limit} = loaderUtils.getOptions(this)
    console.log(this.resourcePath);
    if (limit && limit > source.length) {
        return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        console.log(222);
        return require('./file-loader1').call(this, source)
    }
}
loader.raw = true // 二进制
module.exports = loader
