const util = require("util");
let fs = require("fs");
let inputArr = fs.readFileSync("input.txt")
                 .toString()
                 .split("\r\n");
inputArr = inputArr.map((line) => line.split(''));
inputArr = inputArr.map((arr1) => arr1.map((e) => parseInt(e)));

function Node(distanceTo, i, j){
    this.visited = false;
    this.tentativeDistance = Number.MAX_SAFE_INTEGER;
    this.distanceTo = distanceTo;
    this.gridLoc = [i, j];
}

const main = () => {
    let grid = inputArr.map((row, i) => { //Remember with map you must return if not oneline!
        return row.map((element, j) => {
            return new Node(element, i, j);
        })
    })

    
    //Increase grid size to 5x5
    let newGrid = Array.from({length: grid.length*5}, () => Array.from({length: grid[0].length*5}, () => new Node(0, 0, 0)));
    for(let i=0; i<newGrid.length; ++i){
        for(let j=0; j<newGrid[0].length; ++j){
            let newDistance = (grid[i%grid.length][j%grid[0].length].distanceTo + (1*Math.floor(i/grid.length)) + (1*Math.floor(j/grid[0].length)))%10;
            if((grid[i%grid.length][j%grid[0].length].distanceTo + (1*Math.floor(i/grid.length)) + (1*Math.floor(j/grid[0].length))) >= 10){
                newDistance += 1;
            }
            newGrid[i][j].gridLoc[0] = i;
            newGrid[i][j].gridLoc[1] = j;
            newGrid[i][j].distanceTo = newDistance;
        }
    }
    grid = newGrid;

    //Initial node current, tentative distance = 0, visited = true
    grid[0][0].visited = true; 
    grid[0][0].tentativeDistance = 0;
    let cur = [0, 0];
    let unvisitedSet = [];

    //Add unvisited to the unvisited set
    grid.forEach((line) => line.forEach((e) => { //THESE ADD THE ACTUAL ITEMS, THIS IS GOOD!
        if(!e.visited){
            unvisitedSet.push(e);
        }
    }))

    //Dijkstra's algorithm
    while(!grid[grid.length-1][grid[0].length-1].visited) //While the destination is unvisited
    {
        //Update current grid position
        let i = cur[0];
        let j = cur[1];
        let calcDistance = 0;

        //Calculate tentative distances for unvisited neighbors
        if(i-1 >= 0){
            if(!grid[i-1][j].visited){
                calcDistance = grid[cur[0]][cur[1]].tentativeDistance+grid[i-1][j].distanceTo;
                if(calcDistance < grid[i-1][j].tentativeDistance){
                    grid[i-1][j].tentativeDistance = calcDistance;
                }
            }
        }
        if(i+1 < grid.length){
            if(!grid[i+1][j].visited){
                calcDistance = grid[cur[0]][cur[1]].tentativeDistance+grid[i+1][j].distanceTo;
                if(calcDistance < grid[i+1][j].tentativeDistance){
                    grid[i+1][j].tentativeDistance = calcDistance;
                }
            }
        }
        if(j-1 >= 0){
            if(!grid[i][j-1].visited){
                calcDistance = grid[cur[0]][cur[1]].tentativeDistance+grid[i][j-1].distanceTo;
                if(calcDistance < grid[i][j-1].tentativeDistance){
                    grid[i][j-1].tentativeDistance = calcDistance;
                }
            }
        }
        if(j+1 < grid[0].length){
            if(!grid[i][j+1].visited){
                calcDistance = grid[cur[0]][cur[1]].tentativeDistance+grid[i][j+1].distanceTo;
                if(calcDistance < grid[i][j+1].tentativeDistance){
                    grid[i][j+1].tentativeDistance = calcDistance;
                }
            }
        }

        //Mark node as visited
        grid[i][j].visited = true;

        //Remove node from unvisited set
        unvisitedSet = unvisitedSet.filter((e) => {
            return (e.gridLoc[0] !== i || e.gridLoc[1] !== j)
        })

        //Mark node as new curNode
        let smallestTentativeDistIndex = 0;
        let startVal = Number.MAX_SAFE_INTEGER;
        unvisitedSet.forEach((e, i) => {
            if(e.tentativeDistance < startVal){
                startVal = e.tentativeDistance;
                smallestTentativeDistIndex = i;
            }
        })
        
        /*
        console.log(grid[i][j]);
        console.log(grid.length, grid[0].length);
        console.log(unvisitedSet.length);
        console.log("Unvisitedsetlength", unvisitedSet.length);
        console.log(unvisitedSet[smallestTentativeDistIndex].gridLoc[0], unvisitedSet[smallestTentativeDistIndex].gridLoc[1])
        */
        if(unvisitedSet.length > 0){
            cur[0] = unvisitedSet[smallestTentativeDistIndex].gridLoc[0];
            cur[1] = unvisitedSet[smallestTentativeDistIndex].gridLoc[1];
        }
    }

    console.log(grid[grid.length-1][grid[0].length-1].tentativeDistance);
}

main();

/* Template for grid boundary checking
if(i-1 >= 0){
    
}
if(i+1 < grid.length){
    
}
if(j-1 >= 0){
    
}
if(j+1 < grid[0].length){
    
}
*/