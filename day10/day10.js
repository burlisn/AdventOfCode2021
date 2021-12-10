const util = require("util");
let fs = require("fs");
let allLines = fs.readFileSync("input.txt")
                 .toString()
                 .split("\r\n");
let nonCorruptLines = [];
let myStack = [];

const main = () => {
    let ans1 = 0;
    let ans2 = 0;
    let scoreArr = [];

    nonCorruptLines = allLines.filter((line) => { //Act on each element of arr. If you want it in newArr, return val
        myStack = [];
        let lastItem = '';
        let fileCorrupt = false;
        for(let i=0; i<line.length; ++i){
            if(line[i] === '('){
                myStack.push('(');
            }
            else if(line[i] === '{'){
                myStack.push('{');
            }
            else if(line[i] === '['){
                myStack.push('[');
            }
            else if(line[i] === '<'){
                myStack.push('<');
            }
            else if(line[i] === ')'){
                lastItem = myStack.pop();
                if(lastItem !== '('){
                    fileCorrupt = true;
                    ans1 += 3;
                    break;
                }
            }
            else if(line[i] === '}'){
                lastItem = myStack.pop();
                if(lastItem !== '{'){
                    fileCorrupt = true;
                    ans1 += 1197;
                    break;
                }
            }
            else if(line[i] === ']'){
                lastItem = myStack.pop();
                if(lastItem !== '['){
                    fileCorrupt = true;
                    ans1 += 57;
                    break;
                }
            }
            else if(line[i] === '>'){
                lastItem = myStack.pop();
                if(lastItem !== '<'){
                    fileCorrupt = true;
                    ans1 += 25137;
                    break;
                }
            }
        }
        if(!fileCorrupt){
            return line;
        }
    })

    nonCorruptLines.forEach((line) => { //Part 2, add scores to scoreArr
        myStack = [];
        let lineScore = 0;
        let lastItem = '';

        for(let i=0; i<line.length; ++i){ //Perform the pushing and popping
            if(line[i] === '('){
                myStack.push('(');
            }
            else if(line[i] === '{'){
                myStack.push('{');
            }
            else if(line[i] === '['){
                myStack.push('[');
            }
            else if(line[i] === '<'){
                myStack.push('<');
            }
            else if(line[i] === ')'){
                lastItem = myStack.pop();
            }
            else if(line[i] === '}'){
                lastItem = myStack.pop();
            }
            else if(line[i] === ']'){
                lastItem = myStack.pop();
            }
            else if(line[i] === '>'){
                lastItem = myStack.pop();
            }
        }

        while(myStack.length !== 0){
            lastItem =myStack.pop();
            if(lastItem === '('){
                lineScore *= 5;
                lineScore += 1;
            }
            else if(lastItem === '{'){
                lineScore *= 5;
                lineScore += 3;
            }
            else if(lastItem === '['){
                lineScore *= 5;
                lineScore += 2;
            }
            else if(lastItem === '<'){
                lineScore *= 5;
                lineScore += 4;
            }
        }
        scoreArr.push(lineScore);
    })

    console.log(allLines.length, nonCorruptLines.length);
    console.log(ans1);
    scoreArr.sort((a, b) => a-b);
    console.log(scoreArr[27]);
}

main();