// 简易版的promise

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise (fn) {
  const that = this;
  that.state = PENDING
  // 用于保存resolve或者reject中传入的值
  that.value = null
  // resolvedCallbacks 和 rejectedCallbacks 用于保存 then 中的回调，因为当执行完 Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来用于状态改变时使用
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  // 执行态
  function resolve (value) {
    // 首先需要判断传入的值是否为 Promise 类型
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        that.resolvedCallbacks.map(cb => cb(that.value))
      }
    }, 0)
  }

  // 拒绝态
  function reject (value) {
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.map(cb => cb(that.value));
      }
    }, 0)
  }

  // 如果函数正常执行，则执行执行态，否则执行拒绝态；
  try {
    fn(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

// 定义then方法
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  // 每个then函数都需要返回一个新的 Promise 对象，方便链式调用
  let promise2;
  // 判断onFulfilled、onRejected是否为函数类型 => 如果不是函数类型，需要创建一个函数，实现传参
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
        throw r
      };

  // 状态判断执行相应的逻辑
  if (that.state === PENDING) {
    // 返回一个新的promise对象，并在promise中传入一个函数
    return (promise2 = new MyPromise((resolve, reject) => {
      // console.log('添加啦')
      that.resolvedCallbacks.push(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      })

      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      })
    }))
  }
  if (that.state === RESOLVED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      })
    }))
  }
  if (that.state === REJECTED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      })
    }))
  }

  // 解析过程
  function resolutionProcedure (promise2, x, resolve, reject) {
    // 规范规定了 x 不能与 promise2 相等，这样会发生循环引用的问题
    if (promise2 === x) {
      return reject(new TypeError('Error'));
    }

    // 判断x的类型（是否为promise类型）
    if (x instanceof MyPromise) {
      x.then(function(value) {
        resolutionProcedure(promise2, value, resolve, reject)
      }, reject)
    }

    let called = false
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            y => {
              if (called) return
              called = true
              resolutionProcedure(promise2, y, resolve, reject)
            },
            e => {
              if (called) return
              called = true
              reject(e)
            }
          )
        } else {
          resolve(x)
        }
      } catch (e) {
        if (called) return
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 0)
}).then(value => {
  console.log(value);
}).then(() => {
  console.log('hello world')
}).then(() => {
  console.log('耶耶耶');
})

