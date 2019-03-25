// css-loader 用来解析@import这种语法,包括css中引入的图片
function loader(source) {
    let reg = /url\((.+?)\)/g   // 匹配括号

    let pos = 0;
    let current;

    let arr = ['let list = []']

    while (current = reg.exec(source)) {
        let [matchUrl, g] = current   // matchUrl -> 'url("./photo.png")', g  -> '"./photo.png"'
        // console.log(matchUrl, g, 88);
        let lastIndex = reg.lastIndex - matchUrl.length    // 拿到css从开通到地址链接之前的index
        arr.push(`list.push(${JSON.stringify(source.slice(pos, lastIndex))})`)  // 拼入开始和地址之前的代码
        pos = reg.lastIndex
        arr.push(`list.push('url('+ require(${g}) +')')`)    // 拼入图片地址
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)  // 拼入地址到结尾的代码
    arr.push(`module.exports = list.join('')`)
    console.log(arr.join('\r\n'));
    // let list = []
    // list.push("body {\\n  background: #f938ab;\\n  background: ")
    // list.push('url('+ require("./photo.png") +')')
    // list.push(";\\n}\\n")
    // module.exports = list.join('')

    return arr.join('\r\n')
}
module.exports = loader


