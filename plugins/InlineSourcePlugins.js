const HtmlWebpackPlugin = require('html-webpack-plugin')

// 把外链的标签编程内联的标签
class InlineSourcePlugins {
    constructor({match}) {
        this.reg = match  // 正则
    }

    // 处理某一个标签
    processTag(tag, compilation) {
        let newTag = {}
        let url = ''
        if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
            newTag = {
                tagName: 'style',
                attributes: {type: 'text/css'}
            }
            url = tag.attributes.href
        } else if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
            newTag = {
                tagName: 'script',
                attributes: {type: 'application/javascript'}
            }
            url = tag.attributes.src
        }
        if (url) {
            newTag.innerHTML = compilation.assets[url].source(); // 文件内容放到innerHTML属性中
            delete compilation.assets[url]   // 删除原有的资源
            return newTag
            // console.log(compilation.assets[url].source());
        }
        return tag
    }

    // 处理引入标签的数据
    processTags(data, compilation) {
        let headTags = []
        let bodyTags = []
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilation))
        })
        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compilation))
        })
        console.log({...data, headTags, bodyTags})
        return {...data, headTags, bodyTags}
    }



    apply(compiler) {
        // 通过webpackPlugin来实现  npm搜索  html-webpack-plugin
        compiler.hooks.compilation.tap('InlineSourcePlugins', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'alertPlugin',
                (data, callback) => {
                    // console.log('======');
                    // console.log(data) // 插入html标签的数据
                    // console.log('======');
                    data = this.processTags(data, compilation)   // compilation.assets 资源的链接
                    callback(null, data)
                })
        })

    }
}

module.exports = InlineSourcePlugins
