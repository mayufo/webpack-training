// 将css插入到html头部
function loader(source) {
    // console.log(111);
    let style = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
   `
    return style
}
module.exports = loader


// JSON.stringify(source) 可以将代码转为一行
