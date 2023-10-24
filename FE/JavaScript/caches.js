{
    let arr3 = [
        {
            value: 1,
            label: '工具',
            chidren: [
                {
                    value: 2,
                    label: '备忘录',
                    chidren: []
                }
            ]
        },
        {
            value: 3,
            label: '教育',
            chidren: [
                {
                    value: 4,
                    label: '学历教育',
                    chidren: [
                        {
                            value: 6,
                            label: '中等',
                            chidren: []
                        },
                        {
                            value: 5,
                            label: '高等',
                            chidren: []
                        }
                    ]
                },
                {
                    value: 7,
                    label: '成人教育',
                    chidren: []
                }
            ]
        }
    ];

    let arr1 = [
        { '1_class': '工具', '2_class': '备忘录', '1_id': 1, '2_id': 2 },
        { '1_class': '教育', '2_class': '学历教育', '3_class': '中等', '1_id': 3, '2_id': 4, '3_id': 6 },
        { '1_class': '教育', '2_class': '学历教育', '3_class': '高等', '1_id': 3, '2_id': 4, '3_id': 5 },
        { '1_class': '教育', '2_class': '成人教育', '1_id': 3, '2_id': 7 }
    ];

    let arr2 = fn(arr1);

    function fn (arr) {
        let resultArr = [];

        arr.forEach((e) => {
            let num = 1;
            let tempArr = resultArr;

            while (e[`${num}_id`]) {
                let flag = false;

                tempArr.forEach((e2) => {
                    if (e[`${num}_id`] === e2.value) {
                        tempArr = e2.chidren;
                        flag = true;
                    }
                });

                if (!flag) {
                    tempArr.push({
                        value: e[`${num}_id`],
                        label: e[`${num}_class`],
                        chidren: []
                    });

                    tempArr = tempArr[tempArr.length - 1].chidren;
                }

                num++;
            }
        });

        return resultArr;
    }

    console.log(arr2);
}

{
    // 连续赋值
    let a = { n: 1 };
    let b = a;

    a.x = a = { n: 2 };

    console.log(a.x);
    console.log(b.x);
}

{
    let foo = { bar: 1 };
    let arr1 = [1, 2, foo];
    let arr2 = arr1.slice(1);

    arr2[0]++;
    arr2[1].bar++;
    foo.bar++;
    arr1[2].bar++;

    console.log(arr1[1] === arr2[0]);
    console.log(arr1[2] === arr2[1]);
    console.log(foo.bar);
}

{
    const obj = {
        a: 0
    };
    obj['1'] = 0;
    obj[++obj.a] = obj.a++;
    const values = Object.values(obj);
    obj[values[1]] = obj.a;
    console.log(obj);
}

{
    for_level_1: for (let index01 = 0; index01 < 10; index01++) {
        for_level_2: for (let index02 = 0; index02 < 5; index02++) {
            if (index02 % 2 === 0) {
                break for_level_2;
            }
        }
    }

    let count = 0;
    while_level_1: while (count < 10) {
        ++count;
    }
}

{
    /**
     * 数据类型     typeof
     *
     * 原始类型
     * Number      number
     * Boolean     boolean
     * String      string
     * BigInt      bigint
     * Symbol      synbol
     * undefined    undefined
     * null        object
     *
     * 对象类型
     * Object      object function
     */
}

{
    /**
     * 使用 void 0 代替 undefined
     * window.undefined
     */

    // console.log(window.undefined);

    let _undefined = void 0;

    function TestUndefined () {
        let undefined = 0; // eslint-disable-line no-shadow-restricted-names
        console.log(undefined);
    }
}

{
    // 等号运算符的运算和转换规则
    /**
     * 比较运算符，从上到下按照规则比较，直到能得到结果为止
     *
     * 1. 两端类型相同，比较值
     * 2. 两端存在 NaN，返回 false
     * 3. undefined 和 null 只与自身比较，或者相互比较时，才会返回 true
     * 4. 两端都是原始类型，转换成数字比较
     * 5. 一端是原始类型，一端是对象类型，把对象转换成原始类型后进行比较
     */

    /**
     * 对象类型如何转换成原始类型
     * 1. 如果对象拥有[Symbol.toPrimitive]方法，调用该方法；
     *    若该方法能得到原始值，使用该原始值；
     *    若得不到原始值，抛出异常。
     * 2. 调用对象的 valueOf 方法；
     *    若该方法能得到原始值，使用该原始值；
     *    若得不到原始值，进入下一步。
     * 3. 调用对象的 toString 方法；
     *    若该方法能得到原始值，使用该原始值；
     *    若得不到原始值，抛出异常。
     */
    const a = {
        num: 0,
        [Symbol.toPrimitive] () {
            console.log('[Symbol.toPrimitive]');
            return ++this.num;
        },
        valueOf () {
            console.log('valueOf');
            return ++this.num;
        },
        toString () {
            console.log('toString');
            return ++this.num;
        }
    };
    if (a == 1 && (a == 2) & (a == 3)) {
        console.log('666');
    }
}

{
    /**
     * 可迭代对象
     * 满足可迭代协议
     * {
     *      [Symbol.iterator]: function () {
     *          return 迭代器
     *      }
     * }
     */

    let arr = [0, 1, 2];

    let x, y, z;

    const iter = arr[Symbol.iterator]();

    console.log(iter);
    console.log(iter.next()); // x = iter.next().value;
    console.log(iter.next()); // y = iter.next().value;
    console.log(iter.next()); // z = iter.next().value;

    console.log(arr[Symbol.iterator]);

    Object.prototype[Symbol.iterator] = function () {
        return Object.values(this)[Symbol.iterator]();
    };

    // 生成器
    Object.prototype[Symbol.iterator] = function * () {
        return yield * Object.values(this)[Symbol.iterator]();
    };

    let [a, b] = {
        a: 1,
        b: 2
        // [Symbol.iterator] () {
        //     let arr = Object.values(this);
        //     const iter = arr[Symbol.iterator]();
        //     return iter;
        // }
    };
}

{
    /**
     * 任务队列的中断和恢复
     * 依次顺序执行一系列任务
     * 所有任务全部完成后可以得到每个任务的执行结果
     * 需要返回两个方法，start 用于启动任务，pause 用于暂停任务
     * 每个任务具有原子性，即不可中断，只能在两个任务之间中断
     * @param  {...Function} tasks 任务列表，每个任务无参数、异步
     */
    function processTasks (...tasks) {
        let isRunning = false;
        const result = [];
        let index = 0; // 当前执行的任务索引

        return {
            start () {
                // eslint-disable-next-line no-async-promise-executor
                return new Promise(async (resolve, reject) => {
                    if (isRunning) {
                        return;
                    }
                    isRunning = true;
                    // 依次执行任务
                    while (index < tasks.length) {
                        console.log('任务开始', index);
                        result.push(await tasks[index]());
                        console.log('任务结束', index);
                        index++;
                        if (!isRunning) {
                            return;
                        }
                    }
                    isRunning = false;
                    resolve(result);
                });
            },
            pause () {
                isRunning = false;
            }
        };
    }

    const tasks = [];
    for (let index = 0; index < 10; index++) {
        tasks.push(
            () =>
                new Promise((resolve, reject) => {
                    setInterval(() => {
                        resolve(index);
                    }, 2000);
                })
        );
    }

    const processor = processTasks(...tasks);

    const results = [];

    const button = {};

    button.onclick = async () => {
        console.log('点击开始');
        results.push(await processor.start());
        console.log('任务执行完成', results);
    };

    button.onclick = () => {
        console.log('点击暂停');
        processor.pause();
    };
}

{
    // 并发任务控制
    function timeout (time) {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                resolve();
            }, time);
        });
    }

    class SuperTask {
        constructor (options = { parallelCount: 2 }) {
            this.parallelCount = options.parallelCount; // 并发数量
            this.tasks = [];
            this.runningCount = 0; // 正在执行的任务数量
        }

        add (task) {
            return new Promise((resolve, reject) => {
                this.tasks.push({ task, resolve, reject });
                this._run();
            });
        }

        // 执行任务
        _run () {
            while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
                const { task, resolve, reject } = this.tasks.shift();
                ++this.runningCount;
                task()
                    .then(resolve, reject)
                    .finally(() => {
                        --this.runningCount;
                        this._run();
                    });
            }
        }
    }

    const superTask = new SuperTask();
    function addTask (time, name) {
        superTask
            .add(() => timeout(time))
            .then(() => {
                console.log(`任务${name}完成`);
            });
    }

    addTask(10000, 1); // 10000ms 后输出：任务1完成
    addTask(5000, 2); // 5000ms 后输出：任务2完成
    addTask(3000, 3); // 8000ms 后输出：任务3完成
    addTask(4000, 4); // 12000ms 后输出：任务4完成
    addTask(5000, 5); // 15000ms 后输出：任务5完成
}

{
    // 对象数组去重
    const arr = [
        { a: 1, b: 2 },
        { b: 2, a: 1 },
        { a: 1, b: 2, c: { a: 1, b: 2 } },
        { b: 2, a: 1, c: { b: 2, a: 1 } }
    ];

    const newArr = [...arr];

    for (let i = 0; i < newArr.length; i++) {
        for (let j = i + 1; j < newArr.length; j++) {
            if (equals(newArr[i], newArr[j])) {
                newArr.splice(j, 1);
                j--;
            }
        }
    }

    console.log(newArr);

    function isObject (value) {
        return typeof value === 'object' && value !== null;
    }

    function equals (value1, value2) {
        if (!isObject(value1) || !isObject(value2)) {
            return Object.is(value1, value2);
        }

        if (value1 === value2) {
            return true;
        }

        const value1Keys = Object.keys(value1);
        const value2Keys = Object.keys(value2);
        if (value1Keys.length !== value2Keys.length) {
            return false;
        }
        for (const key of value1Keys) {
            if (!value2Keys.includes(key)) {
                return false;
            }
            const res = equals(value1[key], value2[key]);
            if (!res) {
                return false;
            }
        }

        return true;
    }
}

{
    /**
     * 比较两个字符串的大小
     * 两个字符串都是用 - 连接的数字，例如：1-2-33-41-5
     * 比较方式是从左到右，依次比较每个数字的大小，遇到相等数字继续向右比较，遇到不同的数字直接得到比较结果
     * string1 > string2 return 1
     * string1 < string2 return -1
     * string1 === string2 return 0
     */

    function compare (string1, string2) {
        const iter1 = walk(string1);
        const iter2 = walk(string2);

        while (1) {
            const s1 = iter1.next();
            const s2 = iter2.next();

            if (s1.done && s2.done) {
                return 0;
            } else if (s1.done) {
                return -1;
            } else if (s2.done) {
                return 1;
            } else if (s1.value > s2.value) {
                return 1;
            } else if (s1.value < s2.value) {
                return -1;
            }
        }
    }

    function * walk (string) {
        let part = '';

        for (let index = 0; index < string.length; index++) {
            if (string[index] !== '-') {
                part += string[index];
            } else {
                yield Number(part);
                part = '';
            }
        }

        if (part) {
            yield Number(part);
        }
    }

    console.log(compare('1-2-33-41-5', '1-2-33-44-5'));
}

{
    Promise.resolve()
        .then(() => {
            console.log(0);
            return Promise.resolve(4);
        })
        .then((res) => {
            console.log(res);
        });

    Promise.resolve()
        .then(() => {
            console.log(1);
        })
        .then(() => {
            console.log(2);
        })
        .then(() => {
            console.log(3);
        })
        .then(() => {
            console.log(5);
        })
        .then(() => {
            console.log(6);
        });
}

{
    /**
     * 数字转中文数字
     * @param {number} number 万亿以下数字
     * @returns string
     */
    function toChineseNumber (number) {
        const numberStringArray = number
            .toString()
            .replace(/(?=(\d{4})+$)/g, ',')
            .split(',')
            .filter(Boolean);

        const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const units = ['', '十', '百', '千'];
        const bigUnits = ['', '万', '亿'];

        function handleZero (s) {
            return s.replace(/零{2,}/g, '零').replace(/零+$/, '');
        }

        function _transform (n) {
            if (n === '0000') {
                return '零';
            }

            let result = '';

            for (let index = 0; index < n.length; index++) {
                const c = chars[+n[index]];
                let u = units[n.length - 1 - index];

                if (c === chars[0]) {
                    u = '';
                }

                result += c + u;
            }

            return handleZero(result);
        }

        let result = '';

        for (let index = 0; index < numberStringArray.length; index++) {
            const part = numberStringArray[index];
            const c = _transform(part);
            let u = bigUnits[numberStringArray.length - 1 - index];

            if (c === chars[0]) {
                u = '';
            }

            result += c + u;
        }

        return handleZero(result);
    }

    /**
     * 数字转大写中文数字
     * @param {number} number 万亿以下数字
     * @returns string
     */
    function toBigChineseNumber (number) {
        const result = toChineseNumber(number);
        const map = {
            零: '零',
            一: '壹',
            二: '贰',
            三: '叁',
            四: '肆',
            五: '伍',
            六: '陆',
            七: '柒',
            八: '捌',
            九: '玖',
            十: '拾',
            百: '佰',
            千: '仟',
            万: '万',
            亿: '亿'
        };

        return result
            .split('')
            .map((s) => map[s])
            .join('');
    }

    console.log(toChineseNumber(987100500000));
    console.log(toBigChineseNumber(987100500000));
}

{
    /**
     * 两个数组的并集、交集、差集
     * 不能出现重复项，得到的结果是一个新的数组
     */
    const array01 = [33, 22, 22, 55, 33, 11, 33, 5];
    const array02 = [22, 22, 55, 77, 88, 88, 99, 99];

    const union = [...new Set([...array01, ...array02])];
    const cross = [...new Set(array01.filter((it) => array02.includes(it)))];
    const diff = union.filter((it) => !cross.includes(it));

    console.log(union, cross, diff);
}

{
    console.log(['1', '2', '3'].map(parseInt));
}

{
    console.log(parseInt(0.5)); // 0
    console.log(parseInt(0.05)); // 0
    console.log(parseInt(0.005)); // 0
    console.log(parseInt(0.0005)); // 0
    console.log(parseInt(0.00005)); // 0
    console.log(parseInt(0.000005)); // 0
    console.log(parseInt(0.0000005)); // 5
    Number(0.0000005); // 5e-7 科学计数法
}

{
    /**
     * 零宽字符
     * 零宽空格：\u200b
     * 零宽连接符：\u200d，常见的复杂Emoji表情即用到了该字符，用于表示多字符关系从而合成复杂新字符
     * 零宽非连接符：\u200c
     * 零宽非断空格符：\ufeff
     * 左至右符：\u200e
     * 右至左符：\u200f
     */

    let ZWJ_zero_width_joiner = ['\u200b', '\u200d', '\u200c', '\ufeff', '\u200e', '\u200f'];
}
