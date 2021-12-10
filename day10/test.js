let testArr = [2, 3, 7, 8, 4, 5];

console.log(testArr);

let newArr = testArr.filter((val) => {
    if(val>4){
        return val;
    }
})

console.log(newArr);