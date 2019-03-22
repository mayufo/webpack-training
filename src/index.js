console.log('hello')



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
