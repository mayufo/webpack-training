// 将less转为css
let less = require('less')

function loader(source) {
    let css = ''
    // console.log(source, 2222);
    less.render(source, function (err, output) {
        // console.log(output);
        css = output.css
    })
    // css = css.replace(/\n/g, '\\n');
    return css
}

module.exports = loader
