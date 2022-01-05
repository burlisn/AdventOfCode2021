let fs = require("fs");
let input = fs.readFileSync("analyze.txt").toString().split("\r\n\r\n");
input = input.map((prog) => prog.split('\r\n'));
input = input.map((prog) => prog.map((line) => line.split(' ')));

function main(){
    let z = 0;

    for(let startDig=1; startDig<10; ++startDig){
        console.log(startDig);
        let retVal = testDigit(z, startDig, 13);
        if(retVal){
            console.log(retVal);
            break;
        }
    }
}

function testDigit(z, digit, digPos){
    //Test itself
    let inputI = 13-digPos;
    let var1 = parseInt(input[inputI][5][2]);
    let var2 = parseInt(input[inputI][4][2]);
    let var3 = parseInt(input[inputI][15][2]);

    let x = (z % 26) + var1;

    //Return false if type2 and don't equal digit
    if(var2 === 26 && x !== digit){
        return false;
    }

    z = Math.floor(z / var2);
    if(x !== digit){
        z = (z * 26) + digit + var3;
    }

    //Return true if worked and 14th digit
    if(digPos === 0 && z === 0){
        return (digit*Math.pow(10, digPos));
    }
    else if(digPos === 0 && z !== 0){
        return false;
    }

    //Call digits to test next
    for(let newDig=1; newDig<10; ++newDig){
        let retVal = testDigit(z, newDig, digPos-1);
        if(retVal){
            return retVal + digit*Math.pow(10, digPos);
        }
    }

    //Return false if paths didn't work
    return false;
}

main();