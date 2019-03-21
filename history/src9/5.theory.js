class AsyncParallelHook {  // 勾子是同步的 - 瀑布
    constructor(args) {  // args => ['name']
        this.tasks = []
    }

    tapAsync(name, task) {
        this.tasks.push(task)
    }

    tapPromise(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finalCallback = args.pop()   // 拿出最终的函数
        let index = 0
        let done = () => {   // 类似promise.all的实现
            index++;
            if (index === this.tasks.length) {
                finalCallback();
            }
        }
        this.tasks.forEach(task => {
            task(...args, done) // 这里的args 已经把最后一个参数删掉
        })
    }

    promise(...args) {
        let tasks = this.tasks.map(task => task(...args))
        return Promise.all(tasks)
    }
}

let hook = new AsyncParallelHook(['name'])


// hook.tapAsync('react', function (name, callback) {
//     setTimeout(() => {
//         console.log('react', name);
//         callback()
//     }, 1000)
// })
//
// hook.tapAsync('node', function (name, callback) {
//     setTimeout(() => {
//         console.log('node', name);
//         callback()
//     }, 1000)
// })

// hook.tapAsync('webpack', function (name, callback) {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback()
//     }, 1000)
// })

hook.tapPromise('react', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve()
        }, 1000)
    })
})

hook.tapPromise('node', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve()
        }, 1000)
    })
})



//
// hook.callAsync('jw', function () {
//     console.log('end');
// })


hook.promise('jw').then(function () {
    console.log('end');
})
