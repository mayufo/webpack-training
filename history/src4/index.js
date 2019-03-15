// console.log('home');
//
//
// class Log {
//     constructor () {
//         console.log('error111');
//     }
// }
//
// let log = new Log()



// let xhr = new XMLHttpRequest();
//
// // 默认访问 http://localhost:8080  webpack-dev-server 的服务 再转发给3000
// xhr.open('GET', '/user', true);
//
// xhr.onload = function () {
//     console.log(xhr.response)
// }
//
// xhr.send();


// import 'bootstrap'  // 在node_modules查找
// import 'bootstrapCss'  // 在node_modules查找
import './index.css'
// require('./index.css')

// 它会先查看node_modules底下的bootstrap文件的package.json的main

let url = ''
if (DEV === 'dev') {
    // 开发环境
    url = 'http://localhost:3000'
} else {
    // 生成环境
    url = 'http://www.mayufo.cn'
}
console.log(url)
