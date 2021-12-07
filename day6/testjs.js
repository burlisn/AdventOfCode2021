const util = require("util")

let fs = require("fs")
let inputArr = fs.readFileSync("input.txt").toString().split(',').map((v) => {return parseFloat(v)})

console.log(util.inspect(inputArr, {maxArrayLength: null}))

inputArr.forEach((fish) => {
    if(fish === 1){
        inputArr.push(8)
    }
    if(fish === 8){
        inputArr.push(12)
    }
})

inputArr.forEach((fish) => {
    fish = 0
})

console.log(util.inspect(inputArr, {maxArrayLength: null}))