let tempArr = [0, 1];
console.log(tempArr);
tempArr = testFunc();
console.log(tempArr);

function testFunc(){
    return ['a', 'b'];
}

for(let i=0; i<10;){
    i+=1;
    console.log("wepring")
}

console.log(parseInt("100", 2))