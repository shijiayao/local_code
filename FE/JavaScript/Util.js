const UTIL = {
    // 计算时间
    SetTime (time) {
        let T1 = new Date().getTime();
        let T2 = String(time).replace(/-/gi, '/');

        let result = '';

        let TempTime = T1 - new Date(T2).getTime();

        let S = Math.floor(TempTime / 1000);
        let M = Math.floor(TempTime / 1000 / 60);
        let H = Math.floor(TempTime / 1000 / 60 / 60);
        let D = Math.floor(TempTime / 1000 / 60 / 60 / 24);
        let Month = Math.floor(TempTime / 1000 / 60 / 60 / 24 / 30);
        let Y = Math.floor(TempTime / 1000 / 60 / 60 / 24 / 30 / 12);

        if (Y > 0) {
            result = `${Y}年前`;
        } else if (Month > 0) {
            result = `${Month}个月前`;
        } else if (D > 0) {
            result = `${D}天前`;
        } else if (H > 0) {
            result = `${H}小时前`;
        } else if (M > 0) {
            result = `${M}分钟前`;
        } else {
            result = `${S}秒前`;
        }

        return result;
    },
    // 17 位用户ID
    getUserID () {
        let randomNum = Math.random();
        let timestamp = new Date().getTime();

        return String(timestamp) + randomNum.toString(10).substring(2, 6);
    },
    // 获取 url 中携带的参数
    searchParam: function () {
        let urlSearch = window.location.search;

        let searchParamObj = {};

        if (urlSearch.indexOf('?') > -1) {
            let searchArr = urlSearch.slice(1).split('&');

            for (let m = 0; m < searchArr.length; m++) {
                searchParamObj[searchArr[m].split('=')[0]] = searchArr[m].split('=')[1];
            }
        }

        return searchParamObj;
    },
    // 随机打乱数组
    randomArray: function (arr) {
        let _this = this;

        let tempArr = _this.getType(arr) === 'Array' ? arr.slice() : [];
        let resultArr = [];
        let random = 0;

        while (tempArr.length > 0) {
            random = Math.floor(Math.random() * tempArr.length);
            resultArr.push(tempArr[random]);
            tempArr.splice(random, 1);
        }

        return resultArr;
    },
    /**
     * 获取变量详细类型
     * @param {type} unknown
     * @return Function Object Array String Number Boolean ...
     */
    getType: function (unknown) {
        let ret = Object.prototype.toString.call(unknown);
        ret = ret.slice(8, -1);
        return ret;
    },
    // 时间戳转为序列化日期
    timestampSerialize: function (timestamp) {
        let dateNum = 0;
        let dateNumLength = 0;

        if (!isNaN(new Date(timestamp).getTime())) {
            // 字符串日期 或者 数字时间戳
            dateNum = new Date(timestamp).getTime();
        } else if (!isNaN(new Date(Number(timestamp)).getTime())) {
            // 字符串时间戳
            dateNum = new Date(Number(timestamp)).getTime();
        } else {
            return timestamp;
        }

        dateNumLength = String(dateNum).length;

        if (dateNumLength < 10) {
            // 小于 10 位数，默认不是时间戳
            return timestamp;
        } else if (dateNumLength < 13) {
            // 补齐时间戳位数
            dateNum = Number(dateNum) * Math.pow(10, 13 - dateNumLength);
        }

        let D = new Date(dateNum);

        let year = D.getFullYear();
        let month = D.getMonth() + 1;
        let day = D.getDate();
        let hour = D.getHours();
        let minute = D.getMinutes();
        let second = D.getSeconds();

        let dateArr = [year, month, day];
        let timeArr = [hour, minute, second];

        for (let a = 1; a < dateArr.length; a++) {
            dateArr[a] = String(dateArr[a])[1] ? String(dateArr[a]) : '0' + String(dateArr[a]);
        }

        for (let b = 0; b < timeArr.length; b++) {
            timeArr[b] = String(timeArr[b])[1] ? String(timeArr[b]) : '0' + String(timeArr[b]);
        }

        // 2019-08-19
        let dateStr = dateArr.join('-');

        // 2019-08-19 11:38:36
        // let dateStr = dateArr.join('-') + ' ' + timeArr.join(':');

        return dateStr;
    },
    // 生成随机数，范围 x - y
    randomNumber: function (x, y) {
        return Math.floor(Math.random() * (y - x + 1) + x);
    },
    // 生成随机 ID _当前时间戳_随机数(36进制)
    randomIDStr: function (position) {
        let randomNum = Math.random();
        let timestamp = new Date().getTime();

        position = position || '';

        return '_' + timestamp + (position ? '_' + position : '') + '_' + randomNum.toString(36).substring(2);
    },
    // 判断浏览器是否支持 webp 格式的图片方法
    isSupportWebp: function () {
        try {
            return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0;
        } catch (err) {
            return false;
        }
    },
    visbilityEvent: function (fn) {
        let state = (function getVisibilityState () {
            let prefixes = ['webkit', 'moz', 'ms', 'o'];
            if ('visibilityState' in document) return 'visibilityState';
            for (let i = 0; i < prefixes.length; i++) {
                if (prefixes[i] + 'VisibilityState' in document) return prefixes[i] + 'VisibilityState';
            }
            return null;
        })();
        let visProp = (function getHiddenProp () {
            let prefixes = ['webkit', 'moz', 'ms', 'o'];
            // 如果“hidden”是本地支持的，则返回
            if ('hidden' in document) return 'hidden';
            // 循环遍历所有已知前缀，直到找到一个前缀
            for (let i = 0; i < prefixes.length; i++) {
                if (prefixes[i] + 'Hidden' in document) return prefixes[i] + 'Hidden';
            }
            // 否则不支持
            return null;
        })();

        if (visProp) {
            let evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
            $(document).on(evtname, function () {
                let isvisible = document[state] === 'visible';
                fn(isvisible);
            });
        }
    }
};

const GLOBAL = {};

/**
 * 给创建命名空间提供一个统一接口
 * 调用方法：GLOBAL.namespace('Ie');这样便创建了一个ie的命名空间。
 * 创建完命名空间后，如果需要定义一个全局变量，方法如下：GLOBAL.Ie.isIe6;
 * 使用该变量的方法也是：GLOBAL.Ie.isIe6
 * @param str
 */
GLOBAL.namespace = function (str) {
    let nameArr = str.split('.');
    let tempVariable = GLOBAL;

    for (let i = nameArr[0] === 'GLOBAL' ? 1 : 0; i < nameArr.length; i++) {
        tempVariable[nameArr[i]] = tempVariable[nameArr[i]] || {};
        tempVariable = tempVariable[nameArr[i]];
    }
};

GLOBAL.namespace('Util');
GLOBAL.namespace('Js');
GLOBAL.namespace('Cookie');
GLOBAL.namespace('Array');
GLOBAL.namespace('Os');
GLOBAL.namespace('Browser');

const 天干 = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const 地支 = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const 天干地支 = [];

for (let index = 0; index < 60; index++) {
    let 天干_idx = index % 10;
    let 地支_idx = index % 12;

    天干地支.push(天干[天干_idx] + 地支[地支_idx]);
}

console.log(天干地支);

function sleepPromise (time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, (time || 1) * 1000);
    });
}

// 将异步构建成同步执行环境
(async function () {
    await sleepPromise(5);
})();

(function () {
    let temp_cookie_params = {
        crawler: { uidst: -1, status: false },
        position: { provname: '安徽', cityname: '蚌埠', ip: '180.165.129.130', pro_id: 3 },
        cookie_time: { expires: new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000), path: '/', domain: '.lieqinews.com' }
    };

    $.cookie('LQ_crawler', JSON.stringify(temp_cookie_params.crawler), temp_cookie_params.cookie_time);
    $.cookie('LQ_position', JSON.stringify(temp_cookie_params.position), temp_cookie_params.cookie_time);

    console.log($.cookie('LQ_crawler'));
    console.log($.cookie('LQ_position'));
})();

(function (nowTime = new Date().getTime()) {
    let timestamp = new Date(nowTime).getTime();
    let milliscond = timestamp % 1000;
    let milliscondStr = '';

    if (milliscond >= 100) {
        milliscondStr = String(milliscond);
    } else if (milliscond >= 10) {
        milliscondStr = '0' + String(milliscond);
    } else {
        milliscondStr = '00' + String(milliscond);
    }

    let localTime = new Date(nowTime).toLocaleString('zh', { hour12: false });

    console.log(`${localTime}:${milliscondStr}`);
})('Tue, 24 Dec 2019 07:13:20 GMT');

(function () {
    // 页面变灰
    let nowTimeStamp = new Date().getTime();
    let startTimeStamp = new Date('2020/04/04 00:00:00').getTime();
    let endTimeStamp = new Date('2020/04/05 00:00:00').getTime() - 1;

    if (nowTimeStamp >= startTimeStamp && nowTimeStamp <= endTimeStamp) {
        $('head').prepend(
            '<style> html { filter: grayscale(100%); -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter: url("data:image/svg+xml;utf8,#grayscale"); filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); -webkit-filter: grayscale(1); } body { filter: gray; } img { filter: gray; } </style>'
        );
    }
})();

function dateCompute (date) {
    let currentTime = new Date(); // 当前日期
    let currentDayStartMilliseconds = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); // 当天日期时间戳起始毫秒
    let oneDayMilliseconds = 24 * 60 * 60 * 1000;

    let targetTime = new Date(String(date).replace(/-/gi, '/'));
    let targetTimeMilliseconds = new Date(String(date).replace(/-/gi, '/')).getTime();
    let Y = targetTime.getFullYear();
    let M = targetTime.getMonth() + 1;
    let D = targetTime.getDate();
    let HH = targetTime.getHours();
    let MM = targetTime.getMinutes();
    let SS = targetTime.getSeconds();

    let resultDate = '';

    if (Y !== currentTime.getFullYear()) {
        // 不是今年
        resultDate = `${Y}-${M}-${D} ${HH}:${MM}`;
    } else if (
        targetTimeMilliseconds < currentDayStartMilliseconds - oneDayMilliseconds &&
        targetTimeMilliseconds >= currentDayStartMilliseconds - oneDayMilliseconds * 2
    ) {
        // 前天
        resultDate = `前天 ${HH}:${MM}`;
    } else if (targetTimeMilliseconds < currentDayStartMilliseconds && targetTimeMilliseconds >= currentDayStartMilliseconds - oneDayMilliseconds) {
        // 昨天
        resultDate = `昨天 ${HH}:${MM}`;
    } else if (targetTimeMilliseconds >= currentDayStartMilliseconds && targetTimeMilliseconds < currentDayStartMilliseconds + oneDayMilliseconds) {
        // 今天
        resultDate = `今天 ${HH}:${MM}`;
    } else if (
        targetTimeMilliseconds >= currentDayStartMilliseconds + oneDayMilliseconds &&
        targetTimeMilliseconds < currentDayStartMilliseconds + oneDayMilliseconds * 2
    ) {
        // 明天
        resultDate = `明天 ${HH}:${MM}`;
    } else if (
        targetTimeMilliseconds >= currentDayStartMilliseconds + oneDayMilliseconds * 2 &&
        targetTimeMilliseconds < currentDayStartMilliseconds + oneDayMilliseconds * 3
    ) {
        // 后天
        resultDate = `后天 ${HH}:${MM}`;
    } else {
        // 非以上
        resultDate = `${M}-${D} ${HH}:${MM}`;
    }

    return resultDate;
}

const CookieObject = {
    // 设置指定 Cookie
    setCookie (cname, cvalue, options) {
        options = options || {};
        let D = new Date();
        let data = cname + '=' + cvalue + '; ';
        for (let key in options) {
            if (key === 'expires') {
                D.setTime(D.getTime() + options[key] * 24 * 60 * 60 * 1000);
                data += key + '=' + D.toGMTString() + '; ';
            } else {
                data += key + '=' + options[key] + '; ';
            }
        }
        document.cookie = data;
    },
    // 获取指定 Cookie
    getCookie (cname) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return undefined;
    },
    // 序列化 cookie 为一个对象
    serializeCookie () {
        let CK_ARR = document.cookie.split(';');
        let CK_OBJ = {};
        for (let i = 0; i < CK_ARR.length; i++) {
            let tempStr = CK_ARR[i].trim();
            let tempArr = tempStr.split('=');
            if (tempArr[0]) {
                CK_OBJ[tempArr[0]] = tempArr[1];
            }
        }
        return CK_OBJ;
    }
};

const TypeCheckObject = {
    isString (unknown) {
        // 是否字符串
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'String';
    },
    isNumber (unknown) {
        // 是否数字
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Number';
    },
    isBoolean (unknown) {
        // 是否boolean
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Boolean';
    },
    isFunction (unknown) {
        // 是否函数
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Function';
    },
    isNull (unknown) {
        // 是否为null
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Null';
    },
    isUndefined (unknown) {
        // 是否undefined
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Undefined';
    },
    isObject (unknown) {
        // 是否对象
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Object';
    },
    isArray (unknown) {
        // 是否数组
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Array';
    },
    isDate (unknown) {
        // 是否时间
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Date';
    },
    isRegExp (unknown) {
        // 是否正则
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'RegExp';
    },
    isError (unknown) {
        // 是否错误对象
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Error';
    },
    isSymbol (unknown) {
        // 是否Symbol函数
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Symbol';
    },
    isPromise (unknown) {
        // 是否Promise对象
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Promise';
    },
    isSet (unknown) {
        // 是否Set对象
        return Object.prototype.toString.call(unknown).slice(8, -1) === 'Set';
    },
    isType (unknown) {
        // 直接返回类型
        return Object.prototype.toString.call(unknown).slice(8, -1);
    },
    getType (unknown) {
        let ret = Object.prototype.toString.call(unknown);
        ret = ret.slice(8, -1);
        return ret;
    }
};

/**
 * 缓动动画封装函数
 * @param element 需要设置缓动动画的元素
 * @param obj 需要的动画效果，用对象来存储
 * @param fn 回调函数，在缓动动画函数执行完调用的函数，不需要可以不写
 */
function slowMoveAnimation (element, obj, fn) {
    // 清除定时器
    clearInterval(element.timeId);
    // 设置定时器
    element.timeId = setInterval(function () {
        // 设置一个标记，用来判断是不是对象中所有属性都到了目标值
        let flag = true;
        // 遍历对象obj
        for (k in obj) {
            let attr = k;
            let target = obj[k];
            if (attr === 'zIndex') {
                // zIndex不需要动画，直接设置就行
                element.style.zIndex = target;
            } else if (attr === 'opacity') {
                // 获取当前对象的属性值
                let current = window.getComputedStyle(element)[attr];
                // 将数值放大1000倍
                current = current * 1000;
                target = target * 1000;
                // 获取目标值和当前属性值的差
                let step = (target - current) / 10;
                // 最小的值应当是1，所以正值向上取整，负值向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                let temp = current + step;
                element.style[attr] = temp / 1000;
                // 当有属性值没有到达目标时，会改变这个标记为false，继续执行下去
                if (current != target) {
                    flag = false;
                }
            } else {
                // 获取当前对象的属性值
                let current = window.getComputedStyle(element)[attr];
                // 这个值是带有px的字符串，取得数值
                current = parseInt(current);
                // 获取目标值和当前属性值的差
                let step = (target - current) / 10;
                // 最小的值应当是1，所以正值向上取整，负值向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                let temp = current + step;
                element.style[attr] = temp + 'px';
                // 当有属性值没有到达目标时，会改变这个标记为false，继续执行下去
                if (current != target) {
                    flag = false;
                }
            }
        }
        // 当所有的属性值到达目标后，标记不会被改为false时，清除定时器
        if (flag) {
            clearInterval(element.timeId);
            // 增加回调函数判断，短与判断，如果都为真，则调用函数，没有输入回调函数，直接短路返回假值，结束
            fn && fn();
        }
    }, 15);
}

/**
 * 匀速动画封装函数
 * @param element 需要设置缓动动画的元素
 * @param obj 需要的动画效果，用对象来存储
 * @param num 动画运动速读
 * @param fn 回调函数，在缓动动画函数执行完调用的函数，不需要可以不写
 */
function uniformSpeedAnimation (element, obj, num, fn) {
    // 清除定时器
    clearInterval(element.timeId);
    // 如果没有设置速度，就以10为速度
    num = num || 10;
    // 设置定时器
    element.timeId = setInterval(function () {
        // 遍历对象obj
        for (k in obj) {
            let attr = k;
            let target = obj[k];
            if (attr === 'zIndex') {
                // zIndex不需要动画，直接设置就行
                element.style.zIndex = target;
            } else if (attr === 'opacity') {
                // 获取当前对象的属性值
                let current = window.getComputedStyle(element)[attr];
                // 这个值是带有px的字符串，取得数值
                current = parseInt(current);
                // 判断当前位置与目标位置是加还是减
                let step = current < target ? 0.1 : -0.1;
                // 如果没到，继续加下去
                if (Math.abs(current - target) > Math.abs(step)) {
                    current += step;
                    element.style[attr] = current + 'px';
                } else {
                    // 到达目标位置清除定时器
                    clearInterval(element.timeId);
                    // 不管有没有到目标位置，都变成目标位置
                    element.style[attr] = target + 'px';
                    // 回调函数，有就执行，没有就不执行
                    fn && fn();
                }
            } else {
                // 获取当前对象的属性值
                let current = window.getComputedStyle(element)[attr];
                // 这个值是带有px的字符串，取得数值
                current = parseInt(current);
                // 判断当前位置与目标位置是加还是减
                let step = current < target ? num : -num;
                // 如果没到，继续加下去
                if (Math.abs(current - target) > Math.abs(step)) {
                    current += step;
                    element.style[attr] = current + 'px';
                } else {
                    // 到达目标位置清除定时器
                    clearInterval(element.timeId);
                    // 不管有没有到目标位置，都变成目标位置
                    element.style[attr] = target + 'px';
                    // 回调函数，有就执行，没有就不执行
                    fn && fn();
                }
            }
        }
    }, 15);
}

/**
 * 随机颜色封装函数
 * @returns {string} 返回rgb(r,g,b);
 */
function randomColor () {
    let r = parseInt(Math.random() * 256);
    let g = parseInt(Math.random() * 256);
    let b = parseInt(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

/**
 * 自定义进制转换
 */
const BaseConversion = {
    base_string: '0123456789!#$%&()*+,-.:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    base_array: [],
    init_base_array () {
        this.base_array = this.base_string.split('');
    },
    ConversionBase (param) {
        const _this = this;
        const base_array = _this.base_array;
        const base_length = _this.base_array.length;

        let temp_array = [];

        let tempNumber = param;

        while (tempNumber >= base_length) {
            temp_array.push(tempNumber % base_length);

            tempNumber = Math.floor(tempNumber / base_length);
        }

        if (tempNumber > 0) {
            temp_array.push(tempNumber);
        }

        temp_array.reverse();

        let result = temp_array
            .map((element) => {
                return base_array[element];
            })
            .join('');

        console.log(result, temp_array);
    },
    // 还原为十进制
    RevertToDecimal (param) {
        const _this = this;
        const base_array = _this.base_array;
        const base_length = _this.base_array.length;

        let temp_array = param.split('').reverse();

        let result = temp_array.reduce((num, element, index) => {
            return num + base_array.indexOf(element) * Math.pow(base_length, index);
        }, 0);

        console.log(result);
    }
};

/**
 * 深度克隆
 * @param {any} value
 * @returns
 */
function deepClone (value) {
    const cache = new WeakMap();

    function _deepClone (value) {
        console.log(value);
        if (value === null || typeof value !== 'object') {
            return value;
        }

        if (cache.has(value)) {
            return cache.get(value);
        }

        const result = Array.isArray(value) ? [] : {};

        Object.setPrototypeOf(result, Object.getPrototypeOf(value));

        cache.set(value, result);

        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, value[key])) {
                result[key] = deepClone(value[key]);
            }
        }

        return result;
    }

    console.log(cache);

    return _deepClone(value);
}

/*
// 循环引用、原型链
function Test () {
    this.arr = [0, 1, 2, 3, 4];
    this.a = 1;
    this.b = 2;
}

Test.prototype.c = 3;

const tempObject = new Test();
tempObject.d = tempObject;

const cloneObject = deepClone(tempObject);

console.log(tempObject);
console.log(cloneObject);
console.log(tempObject.d === cloneObject.d);
*/

{
    /* ----------------------- */
// 数组
// 生成数组
// 当你需要要生成一个 0-99 的数组
// 方案 1
    const createArrar_01 = (n) => Array.from(new Array(n), (v, i) => i);
    const arr = createArrar_01(100); // 0 - 99 数组
    // 方案 2
    const createArrar_02 = (n) => new Array(n).fill(0).map((v, i) => i);
    createArrar_01(100); // 0 - 99数组
    // 打乱数组
    // 当你有一个数组，你需要打乱这个数组的排序
    const randomSort = (list) => list.sort(() => Math.random() - 0.5);
    randomSort([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // 随机排列结果
    // 数组去重
    // 当你需要将数组中的所有重复的元素只保留一个
    const removeDuplicates = (list) => [...new Set(list)];
    removeDuplicates([0, 0, 2, 4, 5]); // [0,2,4,5]
    // 多数组取交集
    // 当你需要取多个数组中的交集
    const intersection = (a, ...arr) => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

    intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9]);
    // [3, 4]

    // 查找最大值索引
    // 但你需要找到一个数组中的最大值的索引
    const indexOfMax = (arr) => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
    indexOfMax([1, 3, 9, 7, 5]); // 2
    // 查找最小值索引
    // 当你需要找到一个数组中的最小值的索引
    const indexOfMin = (arr) => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0);
    indexOfMin([2, 5, 3, 4, 1, 0, 9]); // 5
    // 找到最接近的数值
    // 当你需要在一个数组中找到一个最接近的值
    const closest = (arr, n) => arr.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev));
    closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50); // 33
    // 压缩多个数组
    // 当你需要将多个数组压缩成一个数组
    const zip = (...arr) => Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) => arr.map((a) => a[i]));
    zip([1, 2, 3, 4], ['a', 'b', 'c', 'd'], ['A', 'B', 'C', 'D']);
    // [[1, 'a', 'A'], [2, 'b', 'B'], [3, 'c', 'C'], [4, 'd', 'D']]

    // 矩阵交换行和列
    // 当你需要将一个矩阵的行和列进行互相交换
    const transpose = (matrix) => matrix[0].map((col, i) => matrix.map((row) => row[i]));
    transpose(
        [
        // [
            [1, 2, 3], //      [1, 4, 7],
            [4, 5, 6], //      [2, 5, 8],
            [7, 8, 9] //      [3, 6, 9],
        ] //  ]
    );

    // 数字转换
    // 进制转换
    // 将 10 进制转换成 n 进制，可以使用 toString(n)
    const toDecimal = (num, n = 10) => num.toString(n);
    // 假设数字10要转换成2进制
    toDecimal(10, 2); // '1010'
    // 将 n 进制转换成 10 进制，可以使用 parseInt(num, n)
    // 10的2进制为1010
    const toDecimalism = (num, n = 10) => parseInt(num, n);
    toDecimalism(1010, 2);

    // 正则
    // 手机号格式化
    // 当你需要将手机号码格式化成 xxx-xxxx-xxxx 的形式
    const formatPhone = (str, sign = '-') =>
        str
            .replace(/(\W|\s)/g, '')
            .split(/^(\d{3})(\d{4})(\d{4})$/)
            .filter((item) => item)
            .join(sign);

    formatPhone('13123456789'); // '131-2345-6789'
    formatPhone('13 1234 56 789', ' '); // '131 2345 6789'
    // 去除多余空格
    // 当你需要将一段文本中的多个空格合并成一个空格
    const setTrimOut = (str) => str.replace(/\s\s+/g, ' ');
    const str = setTrimOut('hello,   jack'); //
    // web
    // 重新加载当前页面
    const reload = () => location.reload();
    reload();

    // 滚动到页面顶部
    // 如果你需要将页面翻到最顶部
    const goToTop = () => window.scrollTo(0, 0);
    goToTop();

    // 元素滚动
    // 如果你希望将一个元素顺滑的滚动到可视区域的起点
    const scrollToTop = (element) => element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    scrollToTop(document.body);

    // 如果你希望将一个元素顺滑的滚动到可视区域的终点
    const scrollToBottom = (element) => element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    scrollToBottom(document.body);

    // 检查当前是否 IE 浏览器
    const isIE = !!document.documentMode;

    // 从给定文本中剥离 html
    // 当你需要在某个文本中将里面的标签全部过滤掉
    const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
    stripHtml('<div>test</div>'); // 'test'
    // 重定向
    // 当你需要跳转到其他页面
    const goTo = (url) => (location.href = url);

    // 文本粘贴
    // 当你需要复制文本到粘贴板上
    const copy = (text) => navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
    copy('你需要粘贴的文本');

    // 日期
    // 判断日期是否为今天
    const isToday = (date) => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);

    // 日期转换
    // 当你需要将日期转换为为 YYYY-MM-DD 格式
    const formatYmd = (date) => date.toISOString().slice(0, 10);
    formatYmd(new Date());

    // 秒数转换
    // 当你需要将秒数转换为 hh:mm:ss 格式
    const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8);
    formatSeconds(200); // 00:03:20
    // 获取某年某月的第一天
    // 当你需要获取某年某月的第一天
    const getFirstDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);
    getFirstDate(new Date('2022-04')); // Fri Apr 01 2022 00:00:00 GMT+0800 (中国标准时间)
    // 获取某年某月的最后一天
    // 当你需要获取某年某月的最后一天
    const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
    getLastDate(new Date('2023-03-04')); // Fri Mar 31 2023 00:00:00 GMT+0800 (中国标准时间)
    // 获取某年月份天数
    // 当你需要获取某年某个月份的总天数
    const getDaysNum = (year, month) => new Date(year, month, 0).getDate();
    const day = getDaysNum(2024, 2); // 29
    // 函数
    // 异步函数判断
    // 判断一个函数是否属于异步函数
    const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]';
    isAsyncFunction(async function () {}); // true
    // 数字
    // 截断数字
    // 当你需要将小数点后的某些数字截断而不取四舍五入
    const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed}})?`))[0];
    toFixed(10.255, 2); // 10.25
    // 四舍五入
    // 当你需要将小数点后的某些数字截断，并取四舍五入
    const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
    round(10.255, 2); // 10.26
    // 补零
    // 当你需要在一个数字 num 不足 len 位数的时候前面补零操作
    const replenishZero = (num, len, zero = 0) => num.toString().padStart(len, zero);
    replenishZero(8, 2); // 08
    // 对象
    // 删除无效属性
    // 当你需要删除一个对象中的属性值为 null 或 undefined 的所有属性
    const removeNullUndefined = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

    removeNullUndefined({ name: '', age: undefined, sex: null }); // { name: '' }
    // 反转对象键值
    // 当你需要将对象的键值对交换
    const invert = (obj) => Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {});
    invert({ name: 'jack' }); // {jack: 'name'}
    // 字符串转对象
    // 当你需要将一串字符串比如'{name: "jack"}'转换成对象时，直接使用 JSON.parse 将会报错。
    const strParse = (str) => JSON.parse(str.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/\'/g, '"'));

    strParse('{name: "jack"}');

    // 其他
    // 比较两个对象
    // 当你需要比较两个对象，js 的等于只能判断对象的地址是否相同，当地址不相同的时候无法判断两个对象的键值对是否一致。
    const isEqual = (...objects) => objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));
    isEqual({ name: 'jack' }, { name: 'jack' }); // true
    isEqual({ name: 'jack' }, { name: 'jack1' }, { name: 'jack' }); // false
    // 随机颜色生成
    // 当你需要获取一个随机颜色
    const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    getRandomColor(); // '#4c2fd7'
    // 颜色格式转换
    // 当你需要将 16 进制的颜色转换成 rgb
    const hexToRgb = (hex) =>
        hex
            .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
            .substring(1)
            .match(/.{2}/g)
            .map((x) => parseInt(x, 16));
    hexToRgb('#00ffff'); // [0, 255, 255]
    hexToRgb('#0ff'); // [0, 255, 255]
    // 获取随机 ip
    // 当你需要生成一个 ip 地址
    const randomIp = () =>
        Array(4)
            .fill(0)
            .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
            .join('.');

    // uuid
    // 当你需要生成一个 id
    const uuid = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid));
    uuid();

    // 获取 cookie
    // 当你需要将 cookie 转换成对象
    const getCookie = () =>
        document.cookie
            .split(';')
            .map((item) => item.split('='))
            .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {});

    getCookie();

    // 强制等待
    // 当你需要等待一段时间，但又不想写在 setTimeout 函数中，造成回调地狱
    const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));
    sleep(2000).then(() => {
        console.log('time');
    });
}
