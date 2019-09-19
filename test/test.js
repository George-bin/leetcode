import {
  twoSum,
  twoSum2
} from '../source/twoSum';
import bubbleSort from '../source/bubbleSort';

test('两数之和，位置 => [2,3]', () => {
  expect(twoSum2([1, 10, 7, 2, 15], 9)).toBe('[2,3]');
});

// test('两数之和，位置 => [0, 1]', () => {
//   expect(twoSum([2, 7, 10, 15], 9)).toBe([0,1].toString());
// });

// test('冒泡排序', () => {
//   expect(bubbleSort([3,1,4,0,-1])).toBe([-1,0,1,3,4].toString())
// })