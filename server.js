// express

let express = require('express')
let webpack = require('webpack')
let app = express();


// 中间件
let middle = require('webpack-dev-middleware')

let config = require('./webpack.config')


let compiler = webpack(config)


app.use(middle(compiler))

app.get('/user', (req, res) => {
    res.json({name: 'mayufo'})
})


app.listen(3000)
