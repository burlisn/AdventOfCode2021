const util = require("util");
let fs = require("fs");
const { totalmem } = require("os");
let inputArr = fs.readFileSync("input.txt")
                 .toString()
                 .split("\r\n")
                 .map((line) => line.split('-'));

//Create multidimensional array which holds each cave, and each cave holds the cave it is connected to
let caveArr = [];
inputArr.forEach((line) => {
    line.forEach((item) => caveArr.push(item));
})
caveArr = [...new Set(caveArr)];

//Set(items) will give unique list of items

//Create adjacency list
let adjList = {};
caveArr.forEach((cave) => {
    adjList[cave] = []; //Use bracket notation to add new key when key is a variable
})
//Add values to adjacency list
inputArr.forEach((pair) => {
    adjList[pair[0]].push(pair[1]);
    adjList[pair[1]].push(pair[0]);
})
console.log(adjList);

let totPaths = 0;
let totPaths2 = 0;
let pathStack = [];
let small2 = ["", 0];

const main = () => {
    //Part 1
    moveForward("start");
    console.log(totPaths);
    let ans1 = totPaths;
    
    
    //Part 2
    caveArr.forEach((cave) => {
        if(!checkUpperCase(cave) && cave !== "start" && cave !== "end"){
            small2[0] = cave;
            small2[1] = 0;
            console.log(small2);
            moveForward("start");
        }
    })
    console.log(ans1 + totPaths2);
}

const moveForward = (cave) => {
    pathStack.push(cave); //add cave to visited list
    if(cave === small2[0]){ //if this is the special cave, increment it indicating it has been visited
        small2[1] += 1;
    }

    if(cave === "end"){ //if this is the end cave, increase totPaths and go back
        if(small2[1] === 2){
            totPaths2 += 1;
        }
        totPaths += 1;
        pathStack.pop(cave);
        return;
    }

    adjList[cave].forEach((nextCave) => {
        if(!checkUpperCase(nextCave) && !pathStack.includes(nextCave) && nextCave !== small2[0]){ //If next cave is lowercase, not already visited, & not the special, go there
            moveForward(nextCave);
        }
        else if(checkUpperCase(nextCave)){ //If next cave is uppercase, go there
            moveForward(nextCave);
        }
        else if(!checkUpperCase(nextCave) && small2[1]<2 && small2[0] === nextCave){ //If next cave is lowercase, special but not visited twice yet
            moveForward(nextCave);
        }
    })

    if(cave === small2[0]){ //If special cave, decrease visited amount
        small2[1] -= 1;
    }
    pathStack.pop(cave); //Remove from visited list for others
    
    return;
}

const checkUpperCase = (string) => {
    if(string === string.toLowerCase()){
        return false;
    }
    else if(string === string.toUpperCase()){
        return true;
    }
    return false;
}

main();