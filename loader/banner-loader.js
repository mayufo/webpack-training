// 拿到loader的配置
let loaderUtils = require('loader-utils')
// 校验loader
let validateOptions = require('schema-utils')
// 读取文件
let fs = require('fs')  // 异步

function loader(source) {  // loader的参数就是源代码
    let options = loaderUtils.getOptions(this)
    let callback = this.async()  // 读取文件是异步
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string'
            },
            filename: {
                type: 'string'
            }
        }
    }
    validateOptions(schema, options, 'banner-loader')  // 自己的校验格式， 自己的写的配置， 对应的loader名字
    if (options.filename) {
        this.cacheable(false)  // 不要缓存  如果有大量计算 推荐缓存
        // this.cacheable && this.cacheable()
        this.addDependency(options.filename) // 自动增加依赖
        fs.readFile(options.filename, 'utf8', function (err, data) {
            callback(err, `/**${data}**/${source}`)
        })
    } else {
        callback(null, `/**${options.text}**/${source}`)
    }
    return source
}
module.exports = loader

