class SyncHook {  // 勾子是同步的
    constructor(args) {  // args => ['name']
        this.tasks = []
    }
    tap (name, task) {
        this.tasks.push(task)
    }
    call (...args) {
        this.tasks.forEach((task) => task(...args))
    }
}

let hook = new SyncHook(['name'])

hook.tap('react', function (name) {
    console.log('react', name);
})


hook.tap('node', function (name) {
    console.log('node', name);
})


hook.call('jw')
