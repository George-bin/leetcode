// 反转字符串

// export default function reverseWords(str) {
//   return str
//     .split(" ")
//     .map(item => {
//       return item
//         .split("")
//         .reverse()
//         .join("");
//     })
//     .join(" ");
// }

export default function reverseWords(str) {
  return str
    .match(/[\w']+/g)
    .map(item => {
      return item
        .split("")
        .reverse()
        .join("");
    })
    .join(" ");
}
