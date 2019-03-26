let qiniu = require('qiniu')
let path = require('path')

class UploadPlugin {
    constructor (options = {}) {
        // 参考 https://developer.qiniu.com/kodo/sdk/1289/nodejs
        let { bucket = '', domain = '', accessKey = '', secretKey = ''} = options
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        let putPolicy = new qiniu.rs.PutPolicy({
            scope: bucket
        });
        this.uploadToken = putPolicy.uploadToken(mac)
        let config = new qiniu.conf.Config();
        this.formUploader = new qiniu.form_up.FormUploader(config)
        this.putExtra = new qiniu.form_up.PutExtra()
    }
    apply (compiler) {
        compiler.hooks.afterEmit.tapPromise('UploadPlugin', (complication) => {
            let assets = complication.assets
            let promise = []
            Object.keys(assets).forEach(filename => {
                promise.push(this.upload(filename))
            })
            return Promise.all(promise)
        })
    }

    upload (filename) {
        return new Promise((resolve, reject) => {
            let localFile = path.resolve(__dirname, '../dist', filename)
            this.formUploader.putFile(this.uploadToken, filename, localFile, this.putExtra, function(respErr,
                                                                                 respBody, respInfo) {
                if (respErr) {
                    reject(respErr)
                }
                if (respInfo.statusCode == 200) {
                    resolve(respBody)
                } else {
                    console.log(respInfo.statusCode)
                    console.log(respBody)
                }
            });
        })
    }
}

module.exports = UploadPlugin
