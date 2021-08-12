Function.prototype.myApply = function (con, arr) {
    let context = con || global;
    context.fn = this;
    let res;
    if (!arr) {
        res = context.fn();
    } else {
        res = context.fn(...arr);
    }
    delete context.fn;
    return res;
}



Function.prototype.myCall = function (con) {
    let context = con || global;
    context.fn = this;
    let res;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    res = context.fn(...args);
    delete context.fn;
    return res;
}

Function.prototype.myBind = function (con) {
    return () => {
        return this.myApply(con, [].slice.call(arguments, 1))
    }
}

function ainstanceOf(fn, obj) {
    return fn.prototype.isPrototypeOf(obj);
}

function debounce(fn, delay) {
    let timer;
    return () => {
        let _this = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.myApply(_this, args)
        }, delay)
    }
}

function throttle(fn, delay) {
    let timer;
    return () => {
        let _this = this;
        let args = arguments;

        if (timer) {
            return;
        }

        timer = setTimeout(() => {
            fn.myApply(_this, args)
            timer = null;
        }, delay)
    }
}

function bubbleSort(arr) {
    let swap;
    for (let i = 0; i < arr.length; i++) {
        swap = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            swap = true;
        }

        if (swap == false) {
            break;
        }
    }

    return arr;
}

function selectSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) min = j;
        }

        [arr[i], arr[min]] = [arr[min], arr[i]]
    }

    return arr;
}

function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (arr[i] > arr[j]) {

                let res = arr.splice(i, 1);
                arr.splice(j, 0, res[0])
            }
        }
    }

    return arr;
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > pivot) {
            right.push(arr[i])
        } else {
            left.push(arr[i]);
        }
    }

    return [].concat(quickSort(left), [pivot], quickSort(right));
}

// console.log(quickSort([21,45,34,54233,543,32,345,84563,23,3265,45,2,3,5,6,78,8,52,454,65748]))

function deepCopy(obj, map = new Map()) {
    if (typeof obj === 'object') {
        let res = Array.isArray(obj) ? [] : {};
        if (map.get(obj)) {
            return map.get(obj);
        }
        map.set(obj, res);
        for (const i in obj) {
            res[i] = deepCopy(obj[i], map);
        }

        return map.get(obj);
    } else {
        return obj;
    }
}

const curry = (fn, arr = []) => (...args) => (arg => arg.length === fn.length ? fn(...arg) : curry(fn, arg))([...arr, ...args]);

function curryTong(fn,args){
    let length = fn.length;
    let args = args || [];

    return function(){
        newArgs = args.concat(Array.prototype.slice.call(arguments));

        if(newArgs.length < length){
            return curry.call(this,fn,newArgs);
        }else{
            return fn.apply(this,newArgs);
        }
    }
}

function instanceOf(left,right){
    let proto = left.__proto__;
    let prototype = right.prototype;
    while(true){
        if(proto === null) return false;
        if(proto === prototype) return true;;
        proto = proto.__proto__;
    }
}

function
