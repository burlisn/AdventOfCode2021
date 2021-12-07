const util = require("util")

let fs = require("fs")
let inputArr = fs.readFileSync("input.txt").toString().split(',').map((val) => {return parseFloat(val)})

const main = () => {
    let bestAlignment = Number.MAX_SAFE_INTEGER;
    let bestAlignment2 = Number.MAX_SAFE_INTEGER;
    let fuel = 0;
    let fuel2 = 0;
    let n = 0;
    let max = Math.max(...inputArr);
    let min = Math.min(...inputArr);

    for(let i=min; i<max; ++i){
        fuel = 0;
        fuel2 = 0;
        n = 0;
        inputArr.forEach((val) => {
            if(val > i){
                fuel += val-i;
                n = val-i;
                fuel2 += (n*(n+1))/2;
            }
            else if(val < i){
                fuel += i-val
                n = i-val;
                fuel2 += (n*(n+1))/2;
            }
        })
        if(fuel < bestAlignment){
            bestAlignment = fuel;
        }
        if(fuel2 < bestAlignment2){
            bestAlignment2 = fuel2;
        }
    }

    console.log(bestAlignment);
    console.log(bestAlignment2);
}

main()