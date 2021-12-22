const util = require("util");
let fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

let numbers = getNumbersFromString(input);

let x1 = numbers[0]; //smaller
let x2 = numbers[1]; //larger
let y1 = numbers[2]; //smaller
let y2 = numbers[3]; //larger

/* const main = () => {}, this is a function EXPRESSION */

//If the probe is below the target area, or past it it is impossible to reach

function main(){
    let winStat = [false, 0, 0, 0]; //in targ area, win x, win y, max y
    let curStat = [false, 0, 0, 0];
    let velocityCount = 0;
    
    for(let xv=0; xv<281; xv++){
        for(let yv=-73; yv<500; yv++){
            curStat = testIt(xv, yv);
            if(curStat[0] && curStat[3] > winStat[3]){
                winStat = curStat.map((e) => e);
            }
            if(curStat[0]){
                velocityCount += 1;
            }
        }
    }

    console.log(winStat[3]);
    console.log(velocityCount);
}

function getNumbersFromString(numberString){
    var regx = numberString.match(/-?\d+/g).map(Number);
    return regx;
}

function testIt(xi, yi){
    let xc = xi; //xc - current, xi - initial
    let yc = yi;
    let x = 0; //current x pos
    let y = 0;
    let ygreat = y;
    let inTarg = false;

    while(x<=x2 && y>=y1){
        //Evaluate if in target area
        if(x >= x1 && x <= x2 && y >= y1 && y <= y2){ //In target area
            inTarg = true;
        }

        //Move position
        x += xc;
        y += yc;

        //Update ygreat
        if(ygreat < y){
            ygreat = y;
        }

        //Update xc and yc
        if(xc > 0){
            xc -= 1;
        }
        else if(xc === 0){
            xc = 0;
        }
        else if(xc < 0){
            xc += 1;
        }
        yc -= 1;
    }

    return [inTarg ,xi, yi, ygreat];
}

main();