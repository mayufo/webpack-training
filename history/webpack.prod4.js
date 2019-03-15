let merge = require('webpack-merge')
let base = require('./webpack.base4.js')


module.exports = merge(base, {
    mode: 'production'
})
