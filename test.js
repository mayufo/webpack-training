var Remarkable = require('remarkable');
var toc = require('markdown-toc');

function render(str, options) {
    return new Remarkable()
        .use(toc.plugin(options)) // <= register the plugin
        .render(str);
}

var results = render('# AAA\n# BBB\n# CCC\nfoo\nbar\nbaz');


console.log(results.content);

console.log(toc('# AAA\n## BBB\n### CCC\nfoo').json);
