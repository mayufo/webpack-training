let {AsyncParallelHook} = require('tapable')   // 解构同步勾子

// 不返回undefined 会多次执行

class Lesson {
    constructor() {
        this.index = 0
        this.hooks = {
            // 订阅勾子
            arch: new AsyncParallelHook(['name']),

        }
    }

    start() {
        // 发布
        // this.hooks.arch.callAsync('may', function () {
        //     console.log('end');
        // })
        // 另一种发布
        this.hooks.arch.promise('may').then(function () {
                console.log('end');
            }
        )
    }

    tap() {   //  注册监听函数,订阅
        // this.hooks.arch.tapAsync('node',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('node', name)
        //         callback()
        //     }, 1000)
        // })
        // this.hooks.arch.tapAsync('react',  (name, callback) => {
        //     setTimeout(() => {
        //         console.log('react', name)
        //         callback()
        //     }, 1000)
        // })
        // 另一种订阅
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name)
                    resolve()
                }, 1000)
            })
        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name)
                    resolve()
                }, 1000)
            })
        })
    }
}


let l = new Lesson()

l.tap();  //注册两个函数
l.start() // 启动勾子


