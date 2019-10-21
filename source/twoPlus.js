// 原始方法
export function addTwoNumbers (l1, l2) {
    let res = 0;
    l1 = Number(l1.reverse().join(''));
    l2 = Number(l2.reverse().join(''));
    res = l1 + l2;
    res = res.toString().split('');
    res = res.map(element => {
        return Number(element);
    });
    return JSON.stringify(res.reverse());
}
