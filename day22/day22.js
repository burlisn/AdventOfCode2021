const util = require("util");
let fs = require("fs");
let input = fs.readFileSync("input.txt").toString().split("\r\n");
input = input.map((line) => line.split(' '));
var pni = /-?\d+/g; //Positive or negative int regex

var Range = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    z1: 0,
    z2: 0
};

function prt1(){
    let X = [];
    let Y = [];
    let Z = [];
    var setVal = false;
    var ans1 = 0;

    var space = Array.from({length: 101}, () => Array.from({length: 101}, () => Array.from({length: 101}, () => false)));

    input.forEach((line) => {
        findRange(line[1]);
        if(Range.x1<-50){Range.x1 = -50}
        if(Range.x2>50){Range.x2 = 50}
        if(Range.y1<-50){Range.y1 = -50}
        if(Range.y2>50){Range.y2 = 50}
        if(Range.z1<-50){Range.z1 = -50}
        if(Range.z2>50){Range.z2 = 50}

        if(line[0] === "on"){
            setVal = true;
        }
        else if(line[0] === "off"){
            setVal = false;
        }

        for(let i=Range.x1+50; i<=Range.x2+50; ++i){
            for(let j=Range.y1+50; j<=Range.y2+50; ++j){
                for(let k=Range.z1+50; k<=Range.z2+50; ++k){
                    //console.log(i, j, k, setVal);
                    space[i][j][k] = setVal;
                }
            }
        }
    })

    for(let i=0; i<=100; i++){
        for(let j=0; j<=100; j++){
            for(let k=0; k<=100; k++){
                if(space[i][j][k]){
                    ans1 += 1;
                }
            }
        }
    }

    console.log(ans1);
}

function prt2(){
    var X = [];
    var Y = [];
    var Z = [];
    var setVal = false; //For each instruction, set cube positions to the set value
    var ans2 = 0;

    input.forEach((line) => {
        findRange(line[1]);
        Range.x2 += 1;
        Range.y2 += 1;
        Range.z2 += 1;
        X.push(Range.x1);
        X.push(Range.x2);
        Y.push(Range.y1);
        Y.push(Range.y2);
        Z.push(Range.z1);
        Z.push(Range.z2);
    })

    X = [...new Set(X)]; //Remove duplicates
    Y = [...new Set(Y)];
    Z = [...new Set(Z)];

    X.sort((a,b) => a-b); //Sort in increasing order
    Y.sort((a,b) => a-b);
    Z.sort((a,b) => a-b);

    var str = '';
    for(let i=0; i<Z.length; i++){
        str += '0';
    }
    var space = Array.from({length: X.length}, () => Array.from({length: Y.length}, () => str));

    input.forEach((line, index) => {
        console.log(index);
        if(line[0] === "on"){
            setVal = true;
        }
        else if(line[0] === "off"){
            setVal = false;
        }
        findRange(line[1]);
        Range.x2 += 1;
        Range.y2 += 1;
        Range.z2 += 1;
        let x0 = X.findIndex((e) => e === Range.x1);
        let x1 = X.findIndex((e) => e === Range.x2);
        let y0 = Y.findIndex((e) => e === Range.y1);
        let y1 = Y.findIndex((e) => e === Range.y2);
        let z0 = Z.findIndex((e) => e === Range.z1);
        let z1 = Z.findIndex((e) => e === Range.z2);

        for(let i=x0; i<x1; ++i){
            for(let j=y0; j<y1; ++j){
                for(let k=z0; k<z1; ++k){
                    if(setVal){
                        space[i][j] = replaceAt(k, space[i][j], '1');
                    }
                    else if(!setVal){
                        space[i][j] = replaceAt(k, space[i][j], '0');
                    }
                }
            }
        }
    })

    for(let i=0; i<X.length-1; ++i){
        for(let j=0; j<Y.length-1; ++j){
            for(let k=0; k<Z.length-1; ++k){
                if(space[i][j][k] === '1'){
                    ans2 += (X[i+1]-X[i]) * (Y[j+1]-Y[j]) * (Z[k+1]-Z[k]);
                }
            }
        }
    }

    console.log(ans2);
}

function findRange(str){
    var rangeArr = str.match(pni);
    rangeArr = rangeArr.map((e) => parseInt(e));
    Range.x1 = rangeArr[0];
    Range.x2 = rangeArr[1];
    Range.y1 = rangeArr[2];
    Range.y2 = rangeArr[3];
    Range.z1 = rangeArr[4];
    Range.z2 = rangeArr[5];
}

function xoff(x){return x-minMax.mx}
function yoff(y){return y-minMax.my}
function zoff(z){return z-minMax.mz}

function replaceAt(index, string, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

prt2();