const util = require("util");
let fs = require("fs");
let input = fs.readFileSync("input.txt").toString().split("\r\n\r\n");
input[1] = input[1].split("\r\n");

function main(){
    let grid = input[1].map((e) => e.split(""));
    let nci = 0; //nci = new character index

    for(let run=0; run<50; run++){
        let newGrid = addEdges(grid, run);
        grid = addEdges(grid, run);
        for(let i=0; i<grid.length; ++i){
            for(let j=0; j<grid[0].length; ++j){
                nci = findBinary(grid, i, j, run);
                newGrid[i][j] = input[0][nci];
            }
        }
        grid = newGrid;
    }
    console.log(litPixels(grid));
}

function addEdges(oldGrid, run){
    let newGrid = [];

    for(let i=0; i<oldGrid.length+2; ++i){
        newGrid.push([]); //Create new row
        for(let j=0; j<oldGrid[0].length+2; ++j){
            if(i<1 || i>oldGrid.length || j<1 || j>oldGrid[0].length){
                if(run%2 === 0){
                    newGrid[i].push('.'); //Add dark pixel
                }
                else if(run%2 === 1){
                    newGrid[i].push('#'); //Add light pixel
                }
            }
            else{
                newGrid[i].push(oldGrid[i-1][j-1]); //Add from OG grid
            }
        }
    }
    return newGrid;
}

function printGrid(printGrid){
    let printString = "";
    for(let i=0; i<printGrid.length; ++i){
        printString = "";
        for(let j=0; j<printGrid[0].length; ++j){
            printString += printGrid[i][j];
        }
        console.log(printString);
    }
}

function findBinary(grid, row, col, run){
    let binString = "";
    let retInt = 0;
    for(let i=row-1; i<row+2; ++i){
        for(let j=col-1; j<col+2; ++j){
            if(typeof(grid[i]) === "undefined"){
                if(run%2 === 0){
                    binString += '0';
                }
                else if(run%2 === 1){
                    binString += '1';
                }
            }
            else if(typeof(grid[i][j]) === "undefined"){
                if(run%2 === 0){
                    binString += '0';
                }
                else if(run%2 === 1){
                    binString += '1';
                }
            }
            else{
                if(grid[i][j] === '.'){
                    binString += '0';
                }
                else if(grid[i][j] === '#'){
                    binString += '1';
                }
            }
        }
    }
    retInt = parseInt(binString, 2);
    return retInt;
}

function litPixels(grid){
    let litPixelAmnt = 0;
    for(let i=0; i<grid.length; ++i){
        for(let j=0; j<grid[0].length; ++j){
            if(grid[i][j] === '#'){
                litPixelAmnt += 1;
            }
        }
    }
    return litPixelAmnt;
}

main();