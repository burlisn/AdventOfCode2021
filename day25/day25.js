let fs = require("fs");
let grid1 = fs.readFileSync("input.txt").toString().split("\r\n");
grid1 = grid1.map((line) => line.split(''));

let grid2 = fs.readFileSync("input.txt").toString().split("\r\n");
grid2 = grid2.map((line) => line.split(''));

//[][] goes row column or (y, x)

function main(){
    let moved = true;
    let step = 1;

    while(moved){
        moved = false;
        //Herds consider open spaces and move simultaneously
        //East
        for(let i=0; i<grid1.length; ++i){
            for(let j=0; j<grid1[0].length; ++j){ //Check every pos in the grid
                if(grid1[i][j] === '>'){ //I am >
                    if(j+1<grid1[i].length){
                        if(grid1[i][j+1] === '.'){
                            grid2[i][j] = '.';
                            moved = true;
                        }
                        else{
                            grid2[i][j] = '>';
                        }
                    }
                    else if(j+1 === grid1[i].length){
                        if(grid1[i][0] === '.'){
                            grid2[i][j] = '.';
                            moved = true;
                        }
                        else{
                            grid2[i][j] = '>';
                        }
                    }
                }

                if(grid1[i][j] === 'v'){ //I am v
                    grid2[i][j] ='v';
                }

                if(grid1[i][j] === '.'){ //I am .
                    if(j-1>=0){
                        if(grid1[i][j-1] === '>'){
                            grid2[i][j] = '>';
                            moved = true;
                        }
                        else{
                            grid2[i][j] = '.';
                        }
                    }
                    else if(j-1<0){
                        if(grid1[i][grid1[0].length-1] === '>'){
                            grid2[i][j] = '>';
                            moved = true;
                        }
                        else{
                            grid2[i][j] = '.';
                        }
                    }
                }
            }
        }


        //South
        for(let i=0; i<grid2.length; ++i){
            for(let j=0; j<grid2[0].length; ++j){ //Check every pos in grid
                if(grid2[i][j] === 'v'){ //I am v
                    if(i+1<grid2.length){
                        if(grid2[i+1][j] === '.'){
                            grid1[i][j] = '.';
                            moved = true;
                        }
                        else{
                            grid1[i][j] = 'v';
                        }
                    }
                    else if(i+1 === grid2.length){
                        if(grid2[0][j] === '.'){
                            grid1[i][j] = '.';
                            moved = true;
                        }
                        else{
                            grid1[i][j] = 'v';
                        }
                    }
                }

                else if(grid2[i][j] === '>'){ //I am >
                    grid1[i][j] ='>';
                }

                else if(grid2[i][j] === '.'){ //I am .
                    if(i-1>=0){
                        if(grid2[i-1][j] === 'v'){
                            grid1[i][j] = 'v';
                            moved = true;
                        }
                        else{
                            grid1[i][j] = '.';
                        }
                    }
                    else if(i-1 < 0){
                        if(grid2[grid2.length-1][j] === 'v'){
                            grid1[i][j] = 'v';
                            moved = true;
                        }
                        else{
                            grid1[i][j] = '.';
                        }
                    }
                }
            }
        }

        console.log("step", step);
        printGrid(grid1);

        if(!moved){
            console.log("final_step", step);
        }
        step += 1;
    }
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

main();