
function loader(source) {  // loader的参数就是源代码
    console.log('loader2');
    return source
}

loader.pitch = function () {
    return '111'
}
module.exports = loader
