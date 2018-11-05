// 面试题：计算 'sadfhjkisdafkjlhs' 中出现次数最多的字符并输出为 x:2(字符:出现次数)
var arr = 'sadfhjkisdafkjlhs'.split('');
var obj = {};
while (arr.length) {
    var char = arr.splice(0, 1);
    char = char[0];
    if (obj[char]) {
        obj[char]++;
    } else {
        obj[char] = 1;
    }
}
var list = Object.keys(obj).map(x => {
    return {
        key: x,
        value: obj[x]
    }
});
console.log(list);
list.sort(x => -x.value);
console.log('结果：', list[0].key + ':' + list[0].value);