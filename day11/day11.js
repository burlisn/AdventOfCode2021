const util = require("util");
let fs = require("fs");
let inputArr = fs.readFileSync("input.txt")
                 .toString()
                 .split("\r\n");

inputArr = inputArr.map((i) => {
    return i.split('');
})

inputArr = inputArr.map((val) => {
    return val.map((val2) => parseInt((val2)));
})

let flashed = Array.from({length: 10}, () => Array.from({length: 10}, () => false));

const main = () => {
    let totalFlashes = 0;
    let syncFlashStep = 0;
    let notIt = true;

    for(let step=0; notIt && step<500; ++step){
        notIt = false;

        //Reset 'flashed' array
        flashed = flashed.map((row) => {
            return row.map((item) => false)
        })

        //Increase energy level of each octo by 1
        for(let i=0; i<10; ++i){
            for(let j=0; j<10; ++j){
                inputArr[i][j] += 1;
            }
        }

        //Starting flashing (this may not work)
        for(let i=0; i<10; ++i){
            for(let j=0; j<10; ++j){
                if(inputArr[i][j]>9 && flashed[i][j]===false){
                    if(step<100){
                        totalFlashes += flash(i, j);
                    }
                    else{
                        flash(i, j);
                    }
                }
            }
        }

        //Set flashed energy levels to 0
        for(let i=0; i<10; ++i){
            for(let j=0; j<10; ++j){
                if(flashed[i][j]){
                    inputArr[i][j] = 0;
                }
            }
        }

        //Check if all flashed
        for(let i=0; i<10 && !notIt; ++i){
            for(let j=0; j<10 && !notIt; ++j){
                if(!flashed[i][j]){
                    notIt = true;
                }
            }
        }
        if(!notIt){
            syncFlashStep = step+1;
        }
    }
    console.log(totalFlashes);
    console.log(syncFlashStep);
}

const flash = (i, j) => {
    let sumFlash = 1; //Starting at 1 indicates i, j flashes
    flashed[i][j] = true;

    if(i-1 >= 0){ //left
        inputArr[i-1][j] += 1;
        if(inputArr[i-1][j] > 9 && !flashed[i-1][j]){
            sumFlash += flash(i-1, j);
        }
    }
    if(i-1 >= 0 && j+1 < 10){ //top-left
        inputArr[i-1][j+1] += 1;
        if(inputArr[i-1][j+1] > 9 && !flashed[i-1][j+1]){
            sumFlash += flash(i-1, j+1);
        }
    }
    if(j+1 < 10){ //top
        inputArr[i][j+1] += 1;
        if(inputArr[i][j+1] > 9 && !flashed[i][j+1]){
            sumFlash += flash(i, j+1);
        }
    }
    if(i+1 < 10 && j+1 < 10){ //top-right
        inputArr[i+1][j+1] += 1;
        if(inputArr[i+1][j+1] > 9 && !flashed[i+1][j+1]){
            sumFlash += flash(i+1, j+1);
        }
    }
    if(i+1 < 10){ //right
        inputArr[i+1][j] += 1;
        if(inputArr[i+1][j] > 9 && !flashed[i+1][j]){
            sumFlash += flash(i+1, j);
        }
    }
    if(i+1 < 10 && j-1 >= 0){ //bot-right
        inputArr[i+1][j-1] += 1;
        if(inputArr[i+1][j-1] > 9 && !flashed[i+1][j-1]){
            sumFlash += flash(i+1, j-1);
        }
    }
    if(j-1 >= 0){ //bot
        inputArr[i][j-1] += 1;
        if(inputArr[i][j-1] > 9 && !flashed[i][j-1]){
            sumFlash += flash(i, j-1);
        }
    }
    if(i-1 >= 0 && j-1 >= 0){ //bot-left
        inputArr[i-1][j-1] += 1;
        if(inputArr[i-1][j-1] > 9 && !flashed[i-1][j-1]){
            sumFlash += flash(i-1, j-1);
        }
    }

    return sumFlash;
}

main();