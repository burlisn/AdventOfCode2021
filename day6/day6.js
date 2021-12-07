const util = require("util")

let fs = require("fs")
let inputArr = fs.readFileSync("input.txt").toString().split(',').map((v) => {return parseFloat(v)})

//console.log(inputArr.length)
console.log(util.inspect(inputArr, {maxArrayLength: null}))

const main = () => {
    let returnVal = 0
    let temp = 0
    const fishMap = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    inputArr.forEach((val) => {
        fishMap[val] += 1
    })

    console.log(fishMap)

    for(let i=0; i<256; ++i){
        temp = fishMap[0]
        for(let j=0; j<8; ++j){
            if(j===6){
                fishMap[j] = fishMap[j+1] + temp
            }
            else if(j !== 6){
                fishMap[j] = fishMap[j+1]
            }
        }
        fishMap[8] = temp
    }

    for(let i=0; i<9; ++i){
        returnVal += fishMap[i]
    }
    console.log(returnVal)
}

main()