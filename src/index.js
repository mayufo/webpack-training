// console.log('hello')



// let srt = require('-!inline-loader!./a')

// -! 不会让文件 通过pre-loader 和 normal-loader来处理了
// loader1
// loader2
// loader3
// inline
// loader3


// ! 没有normal
// loader1
// loader2
// loader3
// loader1
// inline
// loader3


// !! 什么都不要只要行内处理
// loader1
// loader2
// loader3
// inline


// class May {
//     constructor () {
//         this.name = 'may'
//     }
//     getName () {
//         return this.name
//     }
// }
//
//
// let may = new May()
//
// console.log(may.getName());


// import p from './photo.png'
//
// let img = document.createElement('img')
// img.src = p
// document.body.appendChild(img);


// import './index.less'


alert(111111)

import './index.css'
