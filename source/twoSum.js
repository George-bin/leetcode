// 原始方法
export function twoSum (arr, target) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === target) return [i, j].toString()
    }
  }
}

// 方案二
export function twoSum2 (arr, target) {
  let len = arr.length;
  let result = {};
  for (let i = 0; i < len; i++) {
    if (result[arr[i]] !== undefined) {
      return JSON.stringify([result[arr[i]], i]);
    } else {
      result[target - arr[i]] = i;
    }
  }
}
