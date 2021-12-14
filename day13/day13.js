const util = require("util");
let fs = require("fs");
let inputArr = fs.readFileSync("input.txt")
                 .toString()
                 .split("\r\n\r\n");

let cordArr = inputArr[0].split("\r\n")
                         .map((line) => {
                            charSplit = line.split(',');
                            return charSplit.map((e) => parseInt(e));
                         });

let instructArr = inputArr[1].split("\r\n")
                             .map((line) => {
                                 let retArr = [];
                                 retArr.push(line[11]);
                                 let r = /\d+/; //regex "one or more digits"
                                 retArr.push(parseInt(line.match(r)));
                                 return retArr;
                             });
console.log(instructArr);

let maxX = 1999;
let maxY = 1999;
let grid = [];                         
const main = () => {
    //Create starting grid
    /*
    cordArr.forEach((line) => {
        if(line[0] > maxX){
            maxX = line[0];
        }
        if(line[1] > maxY){
            maxY = line[1];
        }
    })
    console.log(maxX, maxY);
    */
    grid = Array.from({length: 2000}, () => Array.from({length: 2000}, () => 0));
    cordArr.forEach((line) => {
        grid[line[0]][line[1]] = 1;
    })
    console.log(grid.length, grid[0].length);

    //Fold
    let dotCount = 0;
    instructArr.forEach((inst) => {
        dotCount = 0;
        if(inst[0] === 'x'){
            for(let i=0; i<inst[1]; ++i){
                for(let j=0; j<=maxY; ++j){
                    grid[i][j] |= grid[inst[1]*2-i][j];
                }
            }
            maxX = inst[1]-1;
        }
        else if(inst[0] === 'y'){
            for(let i=0; i<=maxX; ++i){
                for(let j=0; j<inst[1]; ++j){
                    grid[i][j] |= grid[i][inst[1]*2-j];
                }
            }
            maxY = inst[1]-1;
        }

        for(let i=0; i<=maxX; ++i){
            for(let j=0; j<=maxY; ++j){
                if(grid[i][j] === 1){
                    dotCount += 1;
                }
            }
        }
        console.log(inst, dotCount, maxX, maxY);
    })

    for(let j=0; j<=maxY; ++j){
        let yString = "";
        for(let i=0; i<=maxX; ++i){
            if(grid[i][j] === 1){
                yString += "#"
            }
            else{
                yString += " "
            }
        }
        console.log(yString);
    }
}

main();