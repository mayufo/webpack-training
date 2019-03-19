let {SyncLoopHook} = require('tapable')   // 解构同步勾子

// 不返回undefined 会多次执行

class Lesson {
    constructor () {
        this.index = 0
        this.hooks = {
            // 订阅勾子
            arch: new SyncLoopHook(['name']),

        }
    }
    start () {
        // 发布
        this.hooks.arch.call('may')
    }
    tap () {   //  注册监听函数,订阅
        this.hooks.arch.tap('node',  (name) => {
            console.log('node', name)
            return ++this.index === 3 ? undefined : '继续学'
        })
        this.hooks.arch.tap('react',  (name) => {
            console.log('react', name)
        })
    }
}


let l = new Lesson()

l.tap();  //注册两个函数
l.start() // 启动勾子


