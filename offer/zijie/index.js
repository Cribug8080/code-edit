function getMaxDigitD(arr, n) {
  if (arr.length === 0) {
    return 0;
  }

  const sorted = arr.sort((a, b) => a - b);
  const firstVal = sorted[0];
  const lastVal = sorted[sorted.length - 1];

  let res = [];
  const nArr = (n + '').split('').map(v => +v);

  let hasL = false;
  nArr.forEach(element => {
    if (hasL) {
      res.push(lastVal);
    } else {
      let target = sorted.findLast(v => element >= v);
      if (target === undefined) {
        target = 0;
      }
      res.push(target);
      if (target < element) {
        hasL = true;
      }
    }
  });

  if (!hasL) {
    for (let index = res.length - 1; index > -1; index--) {
      const element = res[index];
      if (element > firstVal) {
        let target = sorted.findLast(v => element > v);
        res[index] = target;
        res = res.map((v, i) => (i > index) ? lastVal : v);
        hasL = true;
        break;
      }
    }
  }

  if (!hasL) {
    res = new Array(res.length - 1).fill(lastVal);
  }
  return +res.join('');
}

console.log(getMaxDigitD([1,2,9,4], 2533))
console.log(getMaxDigitD([1,2,5,4], 2543))
console.log(getMaxDigitD([1,2,5,4], 2541))
console.log(getMaxDigitD([1,2,9,4], 2111))
console.log(getMaxDigitD([5,9], 5555))