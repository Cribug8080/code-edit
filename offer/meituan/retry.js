
const PromiseRetry = (fn, times) => {
  let time = 0;

  let catchFn = (e) => {
    if (time < times) {
      time++;
      return fn().catch(catchFn);
    } else {
      return Promise.reject(e);
    }
  }

  return fn().catch(catchFn);
}

PromiseRetry(() => {
  let d = Math.random() < 0.3 ? true : false;
  return d ? Promise.resolve('success') :  Promise.reject('fail');
}, 3).then(v => {
  console.log('成功执行');
}).catch(e => {
  console.error(`执行失败 e`);
});



