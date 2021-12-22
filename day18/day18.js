const util = require("util");
let fs = require("fs");
let inputArr = fs.readFileSync("input.txt").toString().split("\r\n");

function createNum(line, i){
    let pos = 0; //indicates when to put element in the right spot
    let temp = [0, 0]; //temp num if needed

    for(let part=0; part<5; ++part){
        if(line[i] === '[' && part === 0){
            i += 1;
        }
        else if(line[i] === '[' && (part === 1 || part === 3)){ //element 1 or 2 is a snailfish number
            let ret = createNum(line, i);
            temp[pos] = ret[1];
            i = ret[0];
            pos += 1;
        }
        else if(parseInt(line[i]) || line[i] === '0'){ //element is a real number
            if(line[i] === '0'){
                temp[pos] = 0;
            }
            else{
                temp[pos] = parseInt(line[i]);
            }
            pos += 1;
            i += 1;
        }
        else if(line[i] === ','){
            i += 1;
        }
        else if(line[i] === ']'){
            return [i+1, temp]; //return next element after it's part 5 and "itself"
        }
    }
}

function main(){
    let largestSum = 0;

    //Part 1
    let num = createNum(inputArr[0], 0)[1];
    for(let i=1; i<inputArr.length; ++i){
        num = [num, createNum(inputArr[i], 0)[1]]; //"Add"  the two numbers
        reduce(num);
    }
    console.log("Final reduced num:", JSON.stringify(num));
    console.log("Final Sum Magnitude:", findMag(num));

    //Part 2
    for(let i=0; i<inputArr.length; ++i){
        for(let j=0; j<inputArr.length; ++j){
            if(i !== j){
                num = [createNum(inputArr[i], 0)[1], createNum(inputArr[j], 0)[1]];
                reduce(num);
                if(findMag(num)>largestSum){
                    largestSum = findMag(num);
                }
                num = [createNum(inputArr[j], 0)[1], createNum(inputArr[i], 0)[1]];
                reduce(num);
                if(findMag(num)>largestSum){
                    largestSum = findMag(num);
                }
            }
        }
    }
    console.log("largestSum:", largestSum);
}

function reduce(num){
    //Explode first
    let keepGoing = true;
    do{
        keepGoing = false;
        let keepExploding = true;
        while(keepExploding){
            if(explodeNum(num, 0)[0]){
                keepGoing = true;
            }
            else{
                keepExploding = false;
            }
        }
        if(splitNum(num)){
            keepGoing = true;
        }
    }while(keepGoing);
}

function explodeNum(num, depth){
    let exp = false; //Did an explosion happen?
    let leftNum = 0; //The left real number that was exploded
    let rightNum = 0;
    let retFrom = '';
    let iAm = false; //I am the exploded snum? Set me to 0

    //Evaluate self
    if(depth === 4 && typeof(num[0]) === "number" && typeof(num[1]) === "number"){ //Need to explode
        leftNum = num[0];
        rightNum = num[1];
        exp = true;
        iAm = true;
        return [exp, leftNum, rightNum, iAm];
    }
    else if(depth === 4 && (typeof(num[0]) !== "number" || typeof(num[1]) !== "number"))
    {
        console.log("some sort of depth problem");
    }
    
    //Check left
    if(typeof(num[0]) !== "number" && !exp){
        let retVal = explodeNum(num[0], depth+1);
        exp = retVal[0];
        leftNum = retVal[1];
        rightNum = retVal[2];
        iAm = retVal[3];
        retFrom = 'l';
        if(iAm){
            num[0] = 0;
            iAm = false;
        }
    }

    //Check right
    if(typeof(num[1]) !== "number" && !exp){
        let retVal = explodeNum(num[1], depth+1);
        exp = retVal[0];
        leftNum = retVal[1];
        rightNum = retVal[2];
        iAm = retVal[3];
        retFrom = 'r';
        if(iAm){
            num[1] = 0;
            iAm = false;
        }
    }

    //Try left and right
    if(exp && leftNum > 0 && retFrom === 'r'){
        if(typeof(num[0]) === "number"){
            num[0] += leftNum;
        }
        else{
            tryRight(num[0], leftNum); //Try right with the number on the LEFT
        }
        leftNum = 0;
    }
    if(exp && rightNum > 0 && retFrom === 'l'){
        if(typeof(num[1]) === "number"){
            num[1] += rightNum;
        }
        else{
            tryLeft(num[1], rightNum); //Try left with the number on the RIGHT
        }
        rightNum = 0;
    }

    return [exp, leftNum, rightNum, iAm]
}

function tryLeft(num, rightNum){
    if(typeof(num[0]) === "number"){
        num[0] += rightNum;
        return;
    }
    else{
        tryLeft(num[0], rightNum);
    }
}

function tryRight(num, leftNum){
    if(typeof(num[1]) === "number"){
        num[1] += leftNum;
        return;
    }
    else{
        tryRight(num[1], leftNum);
    }
}

function splitNum(num){ /*Split not working yet */
    let splitAlready = false;

    //Check left
    if(typeof(num[0]) !== "number" && !splitAlready){
        splitAlready = splitNum(num[0]);
    }
    //Check if we can split
    if(typeof(num[0]) === "number" && !splitAlready){
        if(num[0] > 9){
            num[0] = [Math.floor(num[0]/2), Math.floor((num[0]+2-1)/2)];
            return true;
        }
    }
    if(typeof(num[1]) === "number" && !splitAlready){
        if(num[1] > 9){
            num[1] = [Math.floor(num[1]/2), Math.floor((num[1]+2-1)/2)];
            return true;
        }
    }
    //Check right
    if(typeof(num[1]) !== "number" && !splitAlready){
        splitAlready = splitNum(num[1]);
    }
    
    return splitAlready;
}

function findMag(num){
    let retAmnt = 0;
    if(typeof(num[0]) === "number"){
        retAmnt += 3*num[0];
    }
    else{
        retAmnt += 3*findMag(num[0]);
    }

    if(typeof(num[1]) === "number"){
        retAmnt += 2*num[1];
    }
    else{
        retAmnt += 2*findMag(num[1]);
    }
    return retAmnt;
}

main();