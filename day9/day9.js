const util = require("util");
let fs = require("fs");
let inputArr = fs.readFileSync("input.txt")
                 .toString()
                 .split("\r\n");
inputArr = inputArr.map((i) => { //map does what you say and gives it back, for each lets you do stuff on the value
    return i.split('');
})

inputArr = inputArr.map((val) => { //converting char arr to num arr
    return val.map((val2) => parseInt(val2));
})
let grid = Array.from({length: 100}, () => Array.from({length: 100}, () => 0));

const main = () => {
    //Find the low points
    let valid = true;
    let riskLevel = 0;

    let basin1 = 0;
    let basin2 = 0;
    let basin3 = 0;
    let tempBasin = 0;

    for(let i=0; i<100; ++i){
        for(let j=0; j<100; ++j){
            tempBasin = 0;
            valid = true;
            if(i-1 >= 0){
                if(inputArr[i-1][j] <= inputArr[i][j]){
                    valid = false;
                }
            }
            if(i+1 < 100){
                if(inputArr[i+1][j] <= inputArr[i][j]){
                    valid = false;
                }
            }
            if(j-1 >= 0){
                if(inputArr[i][j-1] <= inputArr[i][j]){
                    valid = false;
                }
            }
            if(j+1 < 100){
                if(inputArr[i][j+1] <= inputArr[i][j]){
                    valid = false;
                }
            }
            if(valid){
                grid[i][j] = 1;
                riskLevel += 1+inputArr[i][j];
                tempBasin = solveThatShit(i, j);

                if(tempBasin > basin1){
                    basin3 = basin2;
                    basin2 = basin1;
                    basin1 = tempBasin
                }
                else if(tempBasin > basin2){
                    basin3 = basin2;
                    basin2 = tempBasin;
                }
                else if(tempBasin > basin3){
                    basin3 = tempBasin;
                }
            }
        }
    }
    console.log(riskLevel);
    console.log(basin1, basin2, basin3);
    console.log(basin1*basin2*basin3);
}

//Called only if part of basin
const solveThatShit = (i, j) => {
    //Check if surrounding values are greater (& not already included)
    let basinSum = 1;
    if(i-1 >= 0){
        if(inputArr[i-1][j] > inputArr[i][j] && inputArr[i-1][j] != 9 && grid[i-1][j] != 1){ //Value is part of basin
            grid[i-1][j] = 1;
            basinSum+=solveThatShit(i-1, j);
        }
    }
    if(i+1 < 100){
        if(inputArr[i+1][j] > inputArr[i][j] && inputArr[i+1][j] != 9 && grid[i+1][j] != 1){
            grid[i+1][j] = 1;
            basinSum+=solveThatShit(i+1, j);
        }
    }
    if(j-1 >= 0){
        if(inputArr[i][j-1] > inputArr[i][j] && inputArr[i][j-1] != 9 && grid[i][j-1] != 1){
            grid[i][j-1] = 1;
            basinSum+=solveThatShit(i, j-1);
        }
    }
    if(j+1 < 100){
        if(inputArr[i][j+1] > inputArr[i][j] && inputArr[i][j+1] != 9 && grid[i][j+1] != 1){
            grid[i][j+1] = 1;
            basinSum+=solveThatShit(i, j+1);
        }
    }
    return basinSum;
}

main()