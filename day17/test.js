let x = 5;

x += -3;
let testArr = ['a', 'b'];
let newArr = testArr.map((e) => e);
newArr[0] = 'c';
console.log(testArr);
console.log(newArr);
console.log(x);