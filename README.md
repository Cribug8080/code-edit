# code-edit

## Promise vs TimeOut
```js
console.log('1')
setTimeout(() => {
  console.log('11')
  new Promise(r => {
    console.log('12')
    r()
  }).then(() => {
    console.log('13')
  })
}, 0);
console.log('2')
new Promise(resolve => {
  console.log('3')
  resolve()
  console.log('4')
}).then(() => {
  console.log('6')
  new Promise(r => {
    console.log('7')
    r();
    console.log('8')
  }).then(() => {
    console.log('10')
  })
  console.log('9')
});
new Promise(r => {
  setTimeout(() => {
    console.log('14')
    r();
  }, 0);
}).then(() => {
  console.log('15')
})
console.log('5')
```

