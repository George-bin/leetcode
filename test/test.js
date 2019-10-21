import { twoSum, twoSum2 } from "../source/twoSum";
import bubbleSort from "../source/bubbleSort";
import { addTwoNumbers } from "../source/twoPlus";

import reverseWords from "../source/reverseWords";

test("反转字符串，输出 => s'teL ekat edoCteeL tsetnoc", () => {
  expect(reverseWords("Let's take LeetCode contest")).toBe(
    "s'teL ekat edoCteeL tsetnoc"
  );
});

// test("两数相加, 输出 => [7,0,8]", () => {
//   expect(addTwoNumbers([2, 4, 3], [5, 6, 4])).toBe("[7,0,8]");
// });

// test('两数之和，位置 => [2,3]', () => {
//   expect(twoSum2([1, 10, 7, 2, 15], 9)).toBe('[2,3]');
// });

// test('两数之和，位置 => [0, 1]', () => {
//   expect(twoSum([2, 7, 10, 15], 9)).toBe([0,1].toString());
// });

// test('冒泡排序', () => {
//   expect(bubbleSort([3,1,4,0,-1])).toBe([-1,0,1,3,4].toString())
// })
