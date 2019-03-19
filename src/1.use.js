let {SyncHook} = require('tapable')   // 解构同步勾子


class Lesson {
    constructor () {
        this.hooks = {
            // 订阅勾子
            arch: new SyncHook(['name']),

        }
    }
    start () {
        // 发布
        this.hooks.arch.call('may')
    }
    tap () {   //  注册监听函数,订阅
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
        })
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name)
        })
    }
}


let l = new Lesson()

l.tap();  //注册两个函数
l.start() // 启动勾子


