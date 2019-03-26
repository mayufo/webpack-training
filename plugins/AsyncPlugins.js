class AsyncPlugins {
    apply (compiler) {
        console.log(2);
        compiler.hooks.emit.tapAsync('AsyncPlugin', (complete, callback) => {
            setTimeout(() => {
                console.log('文件发射出来');
                callback()
            }, 1000)
        })
        compiler.hooks.emit.tapPromise('AsyncPlugin', (complete, callback) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('文件发射出来 222');
                    resolve()
                }, 1000)
            })
        })
    }
}


module.exports = AsyncPlugins
