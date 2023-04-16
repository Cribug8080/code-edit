MyPromise.prototype.STATUS = {
  PENDING: 'PENDING',
  RESOLVED: 'FULFILLED',
  REJECTED: 'REJECT',
}

function MyPromise(fn) {
  this.currentStatus = this.STATUS.PENDING;

  this.value = null;
  this.resolvedCallback = [];
  this.rejectedCallback = [];

  const resolved = (value) => {
    const self = this;
    if (value instanceof MyPromise) {
      return value.then(resolved, rejected);
    }
    setTimeout(() => {
      self.currentStatus = self.STATUS.RESOLVED;
      self.value = value;
      self.resolvedCallback.forEach(rFn => rFn(value));
    }, 0);
  }
  
  const rejected = (value) => {
    const self = this;
    setTimeout(() => {
      self.currentStatus = self.STATUS.REJECTED;
      self.value = value;
      self.rejectedCallback.forEach(rFn => rFn(value));
    }, 0);
  }

  try {
    fn(resolved, rejected);
  } catch (error) {
    rejected(error);
  }

  return ;
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  const self = this;
  return new MyPromise((rs, rj) => {
    // const resolvedFn = typeof onResolved === 'function' ? onResolved : function(value){return value}
    // const rejectedFn = typeof onRejected === 'function' ? onRejected : function(error){throw error}
    const onFulfilled = () => {
      try {
        const preValue = onResolved?.(this.value);
        return preValue instanceof MyPromise ? preValue.then(rs, rj) : rs(preValue);
      } catch (error) {
        rj(error);
      }
    };

    const onReject = () => {
      try {
        const preValue = onRejected?.(this.value);
        return preValue instanceof MyPromise ? preValue.then(rs, rj) : rj(preValue);
      } catch (error) {
        rj(error);
      }
    };

    if (self.currentStatus === self.STATUS.PENDING) {
      self.resolvedCallback.push(onFulfilled);
      self.rejectedCallback.push(onReject);
    }
    if (self.currentStatus === self.STATUS.RESOLVED) {
      onFulfilled(self.value);
    }
    if (self.currentStatus === self.STATUS.REJECTED) {
      onReject(self.value);
    }
  })
}

const p1 = new MyPromise((rs, rj) => {
  setTimeout(() => {
    rs(1);
  }, 0);
}).then((value) => {
  console.log('then val is', value)
  return value + 9;
}).then((value) => {
  console.log('then2 val is', value)
});


