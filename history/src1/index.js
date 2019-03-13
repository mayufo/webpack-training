let str = require('./a.js')

console.log(str);


require('./index.css')
require('./b.less')

// import $ from 'jquery'

// console.log(window.$, 123)


import $ from 'jquery'

console.log($, 123456)
import logo from './logo.png'

console.log(logo)
let image = new Image()

image.src = logo

// document.body.appendChild(image)
// console.log($, 3333333);
