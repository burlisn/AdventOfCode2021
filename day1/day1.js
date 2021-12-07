let fs = require('fs')
let inputArr = fs.readFileSync('day1_input.txt')
                 .toString()
                 .split('\r\n')
                 .map((v) => {return parseFloat(v)})


const getIncreaseCount = (input) => {
    let total = 0;
    for (let i=1;i<input.length;i++) { 
        if (input[i] > input[i-1]){
            total++;
        }
    }
    return total;
}

const getIncreaseCountPart2 = (input) => {
    let total = 0;
    for (let i=3;i<input.length;i++){
        let currentWindow = input[i-2]+input[i-1]+input[i];
        let prevWindow = input[i-3]+input[i-2]+input[i-1];
        if (currentWindow > prevWindow) {
            total++;
        }
    }
    return total;
}

console.log('part1:', getIncreaseCount(inputArr))
console.log('part2:', getIncreaseCountPart2(inputArr))