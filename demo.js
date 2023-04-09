

// ------实现new
function objectFactor(fun, args) {
  if (typeof fun !== 'function') {
    throw new Error('type error');
    return;
  }

  const newObj = Object.create(fun.prototype);
  const returnVal = fun.apply(newObj, args);

  if (typeof returnVal === 'object' || typeof returnVal === 'function') {
    return returnVal;
  }

  return newObj;
}

// function Person(name) {this.name = name;};
// Person.prototype.say = function(){console.log(this.name)};
// let p1 = objectFactor(Person, ['wl']);
// p1.say();

// ------实现一个ajax
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
// ------
// ------
// ------
// ------
// ------
// ------