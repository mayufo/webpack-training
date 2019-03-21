class SyncWaterfallHook {  // 勾子是同步的 - 瀑布
    constructor(args) {  // args => ['name']
        this.tasks = []
    }
    tap (name, task) {
        this.tasks.push(task)
    }
    call (...args) {
        let [first, ...others] = this.tasks;
        let ret = first(...args)
        others.reduce((a, b) => {
            return b(a);
        }, ret);

    }
}

let hook = new SyncWaterfallHook(['name'])

hook.tap('react', function (name) {
    console.log('react', name);
    return 'react Ok'
    // return undefined
})


hook.tap('node', function (name) {
    console.log('node', name);
    return 'node Ok'
})

hook.tap('webpack', function (data) {
    console.log('webpack', data);
})



hook.call('jw')
