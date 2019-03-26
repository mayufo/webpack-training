class FileListPlugin {
    constructor ({filename}) {
        this.filename = filename
    }
    apply (compiler) {
        // 文件已经准备好了 要进行发射
        // emit
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            let assets = compilation.assets;
            console.log(assets, 55);
            let content = `## 文件名  资源大小\r\n`
            // [ [bundls.js, {}], [index.html, {}]]
            Object.entries(assets).forEach(([filename, stateObj]) => {
                content += `- ${filename}    ${stateObj.size()}\r\n`
            })
            // 资源对象
            assets[this.filename] = {
                source () {
                    return content;
                },
                size () {
                    return content.length
                }
            }
        })
    }
}

module.exports = FileListPlugin
