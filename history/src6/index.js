// import jquery from 'jquery'
//
// import moment from 'moment'
//
// import 'moment/locale/zh-cn'
//
// moment.locale('zh-cn')
//
// let r = moment().endOf('day').fromNow()  // 距离现在多少天
// console.log(r);


// import React from 'react'
//
// import {render} from 'react-dom'
//
//
// render(<h1>111111</h1>, window.root)



// import calc from './test'

// console.log(calc.sum(1, 2));

let calc = require('./test')
console.log(calc);   // es 6导出，是一个default的对象
console.log(calc.default.sum(1, 2));

// console.log(111);


let a = 1
let b = 2
let c = 3
let d = a + b + c

console.log(d, '---------');
