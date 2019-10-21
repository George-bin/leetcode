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
  // 建立映射关系（重要）
  let result = {};
  for (let i = 0; i < len; i++) {
    if (result[arr[i]] !== undefined) {
      return JSON.stringify([result[arr[i]], i]);
    } else {
      // 1、确定第一个数字的位置；
      // 2、遍历时，在映射池中（result）中寻找满足条件的数字，避免O(n2)的复杂度；
      result[target - arr[i]] = i;
    }
  }
}
