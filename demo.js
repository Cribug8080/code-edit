// ------Object.create

function objectCreate(obj = null) {
  function Fn() {}
  Fn.prototype = obj;
  return new Fn();
}
// const obj1 = {say: () => console.log('objectCreate---')};
// const obj = objectCreate(obj1);
// obj.say();

// ------instanceof
/**
 * 实现 instanceof
 * @param {object} left 需要检测的对象
 * @param {prototype} right 构造函数
 */
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;

  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
// console.log('myInstanceof', myInstanceof([], Array));
// function Person(name) {
//   this.name = name;
// }
// console.log('myInstanceof', myInstanceof(new Person('2'), Person));
// console.log('myInstanceof', myInstanceof([], Person));



// ------实现new
function objectFactor(fun, args) {
  if (typeof fun !== 'function') {
    throw new Error('type error');
  }

  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  const newObj = Object.create(fun.prototype);
  const returnVal = fun.apply(newObj, args);

  if (typeof returnVal === 'object' || typeof returnVal === 'function') {
    return returnVal;
  }

  return newObj;
}

// function Person(name) {this.name = name;};
// let p1 = objectFactor(Person, ['wl']);
// Person.prototype.say = function(){console.log(this.name)};
// p1.say();

// ------实现一个ajax
// ------实现使用Promise封装AJAX请求
function ajax(url, options = {}) {
  const {
    method = 'GET',
  } = options;
  const result = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      }
    }
    xhr.responseType = 'json';
    xhr.onerror = function() {
      reject(xhr.statusText);
    }
    xhr.send();
  });

  return result;
}

// (async function sendReq() {
//   const res = await ajax('https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort');
//   console.log(res);
// })()





// 实现call、apply 及 bind 函数
Function.prototype.myCall = function(context, ...argus) {
  if (typeof this != 'function') {
    throw new Error('type error');
  }

  context = context || window;

  const tempFn = Symbol('tempFn');
  context[tempFn] = this;
  const res = context[tempFn](...argus);
  delete context[tempFn];
  return res;
}
Function.prototype.myBind = function(context) {
  if (typeof this != 'function') {
    throw new Error('type error');
  }

  context = context || window;
  const args1 = [...arguments].slice(1);
  const applyFn = this;

  function fNop (){};
  function fBound () {
    return applyFn.apply(
      this instanceof fBound ? this : context,
      args1.concat(...arguments)
    )
  };

  fNop.prototype = this.prototype;
  fBound.prototype = new fNop();
  // fBound.prototype = this.prototype;

  return fBound;
}
function say(age) {
  console.log(this.name, age);
}
say.prototype.hello = function() {
  console.log('hello', this.name);
}
// say.myCall({name: 'wl'}, 12)
// const b1 = say.myBind({name: 'b'});
// const b2 = say.myBind({name: 'b'});
// b1();
// const bb2 = new b2();
// console.log(JSON.stringify(bb2))
// bb2.hello();



// ------截流与防抖
function debounce(fn, delay = 50) {
  let time;
  return function() {
    if (time) {
      clearTimeout(time);
      timer = null;
    }
    const context = this;
    const args = [...arguments];
    time = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
}
function throttle(fn, delay = 50) {
  let curTime = Date.now();
  return function() {
    let nowDate = Date.now();
    let context = this;
    let args = [...arguments];
    if (nowDate - curTime > delay) {
      curTime = Date.now();
      fn.apply(context, args);
    }
  }
}
// const printFn = function(...args) {
//   console.log('printFn', ...args);
// }
// const debounceFn1 = throttle(printFn, 1000);
// const debounceFn1 = debounce(printFn, 1000);

// let i = 0;
// const interval = setInterval(() => {
//   debounceFn1(++i);
//   if (i === 10) {
//     clearInterval(interval);
//   }
// }, 300);

// ------ promise
// ------ Promise.then
// ------ Promise.all
// ------ Promise.race
// function MyPromise() {
//   this.
// }



// ------ 柯里化 curry
function curry(fn, ...argus) {
  const len = fn.length;

  return function(...argus2) {
    const subArgus = [...argus, ...argus2];
    if (subArgus.length < len) {
      return curry.call(this, fn, ...subArgus);
    } else {
      return fn.apply(this, subArgus);
    }
  }
}
function curry2(fn, ...args) {
  return fn.length > args.length ? curry2.bind(null, fn, ...args) : fn(...args);
}
// function sum(a, b, c) {
//   console.log(a + b + c)
// }
// const c1 = curry2(sum);
// cc = c1(1,2);
// cc(5);
// cc(6);

// ------ 类型判断函数

// ------reduce

Array.prototype.myReduce = function(fn, initialVal) {
  if (typeof fn != 'function') {
    throw new Error(`${fn} is not a function`);
  }
  let result = initialVal;
  let startIdx = 0;
  if (initialVal === undefined) {
    if (this.length === 0) {
      throw new Error('Reduce of empty array with no initial value');
    }
    result = this[0];
    startIdx = 1;
  }
  const array = this;
  for (let index = startIdx; index < array.length; index++) {
    const element = array[index];
    result = fn(result, element);
  }
  return result;
}
console.log([1].myReduce((p, v) => p + v, 9))


// ------flat
Array.prototype.myFlat = function(depth = 1) {
  const stack = [...this];
  const deepths = new Array(this.length).fill(1);
  const result = [];

  while (stack.length) {
    const ele = stack.pop();
    const deepth2 = deepths.pop();
    if (Array.isArray(ele) && deepth2 < depth) {
      stack.push(...ele);
      deepths.push(...new Array(ele.length).fill(deepth2 + 1));
    } else {
      result.push(ele);
    }
  }
  return result.reverse();
}

console.log([1,2,[3,4, [5, [6]]],7,8,9].myFlat())

// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
// ------
