class AsyncSeriesWaterfallHook {  //
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
        let finalCallback = args.pop()
        let index = 0;
        let next = (err, data) => {
            let task = this.tasks[index]
            if(!task) return finalCallback();
            if (index === 0) {
                // 执行的第一个
                task(...args, next)
            } else {
                task(data, next)
            }
            index ++
        }
        next();
    }

    promise(...args) {
        // 将promise串联起来
        let [first, ...other] = this.tasks
        return other.reduce((p, n) => {
             return p.then((data) => n(data))
        }, first(...args))
    }
}

let hook = new AsyncSeriesWaterfallHook(['name'])


// hook.tapAsync('react', function (name, callback) {
//     setTimeout(() => {
//         console.log('react', name);
//         callback(null, '结果1')
//     }, 1000)
// })
//
// hook.tapAsync('node', function (name, callback) {
//     setTimeout(() => {
//         console.log('node', name);
//         callback(null, '结果2')
//     }, 1000)
// })
//
// hook.tapAsync('webpack', function (name, callback) {
//     setTimeout(() => {
//         console.log('webpack', name);
//         callback()
//     }, 1000)
// })

//
hook.tapPromise('react', function (name, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve('result')
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
//
// hook.callAsync('jw', function () {
//     console.log('end');
// })


hook.promise('jw').then(function () {
    console.log('end');
})
