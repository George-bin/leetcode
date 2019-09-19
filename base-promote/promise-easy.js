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

  // 执行态（回调）
  function resolve (value) {
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  // 拒绝态（回调）
  function reject (value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }

  // promise会立即执行
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
    return (promise2 = new MyPromise((resolve, reject) => {
      that.resolvedCallbacks.push(onFulfilled)
      that.rejectedCallbacks.push(onRejected)
    }))
  }
  // 直接执行执行态
  if (that.state === RESOLVED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      onFulfilled(that.value)
    }))
  }
  // 直接执行拒绝态
  if (that.state === REJECTED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      onRejected(that.value)
    }))
  }
}

new MyPromise((resolve, reject) => {
  // 模拟异步请求
  setTimeout(() => {
    resolve(1)
    // reject('出错啦')
  }, 0)
})
  .then(value => {
    console.log('执行态')
    console.log(value)
  }, (e) => {
    console.log('拒绝态')
    console.log(e)
  })
