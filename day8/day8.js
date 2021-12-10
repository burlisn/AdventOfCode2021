const util = require("util");

valArr = [];
allLetters = "abcdefg";
let letterMap = {
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0
}

//Get each entry as a val in valArr
let fs = require("fs");
const { lookup } = require("dns");
const { Z_ERRNO } = require("zlib");
{
    let inputArr = fs.readFileSync("input.txt").toString().split("\r\n");
    let tempArr = []
    inputArr.forEach((line) => {
        tempArr = tempArr.concat(line.split(" | "));
    })
    tempArr.forEach((spaced) => {
        valArr = valArr.concat(spaced.split(" "));
    })
}

const findUncommon2 = (s1, s2) => {
    let add = true;
    uncommon = [];

    for(let i=0; i<s1.length; ++i){
        add = true;
        for(let j=0; j<s2.length; ++j){
            if(s1[i]===s2[j]){
                add = false;
            }
        }
        if(add){
            uncommon.push(s1[i]);
        }
    }

    for(let i=0; i<s2.length; ++i){
        add = true;
        for(let j=0; j<s1.length; ++j){
            if(s2[i]===s1[j]){
                add = false;
            }
        }
        if(add){
            uncommon.push(s2[i]);
        }
    }

    return uncommon;
}

const main = () => {
    let ans1 = 0;
    let ans2 = 0;
    let letters = [];

    for(let i=0; i<valArr.length; ++i){
        if((i%14) > 9){
            if([2,3,4,7].includes(valArr[i].length) === true){
                ++ans1;
            }
        }
    }

    //part 2
    let temp = [];
    let temp2 = [];
    let add = true;

    for(let i=0; i<valArr.length; i+=14){
        letters = [];
        for(let j=0; j<7; ++j){
            add = true;
            let entries5 = Object.entries(letterMap);
            let entries6 = Object.entries(letterMap);
            switch (letters.length) {
                case 0: //find top
                    valArr.slice(i, i+10).forEach((val) => {
                        if(val.length === 3){
                            temp = val;
                            //console.log(temp);
                        }
                        else if(val.length === 2){
                            temp2 = val;
                            //console.log(temp2);
                        }
                    })
                    letters.push(findUncommon2(temp, temp2)[0]);
                    break;

                case 1: //find bot
                    valArr.slice(i, i+10).forEach((val) => {
                        if(val.length === 5){
                            for(let k=0; k<val.length; ++k){
                                entries5.forEach((entry, index) => {
                                    if(entry[0] === val[k]){
                                        entry[1] += 1;
                                    }
                                })
                            }
                        }
                        else if(val.length === 6){
                            for(let k=0; k<val.length; ++k){
                                entries6.forEach((entry, index) => {
                                    if(entry[0] === val[k]){
                                        entry[1] += 1;
                                    }
                                })
                            }
                        }
                    })
                    console.log(entries5, entries6);

                    entries5.forEach((entry) => {
                        entries6.forEach((entry2) => {
                            if(entry[1]===3 && entry2[1]===3 && entry[0] !== letters[0] && entry[0] === entry2[0]){
                                letters.push(entry[0]);
                                add = false;
                            }
                        })
                    })
                    break;

                case 2: //find bot-left
                    valArr.slice(i, i+10).forEach((val) => {
                        if(val.length === 4){
                            newString = val.concat(letters[0]).concat(letters[1]);
                            valArr.slice(i, i+10).forEach((val2) => {
                                if(val2.length === 7 && findUncommon2(newString, val2).length === 1 && add){
                                    letters.push(findUncommon2(newString, val2)[0]);
                                    add = false;
                                }
                            })
                        }
                    })
                    break;

                case 3: //find top-left
                    valArr.slice(i, i+10).forEach((val) => {
                        if(val.length === 5){
                            for(let k=0; k<val.length; ++k){
                                entries5.forEach((entry, index) => {
                                    if(entry[0] === val[k]){
                                        entry[1] += 1;
                                    }
                                })
                            }
                        }
                        else if(val.length === 6){
                            for(let k=0; k<val.length; ++k){
                                entries6.forEach((entry, index) => {
                                    if(entry[0] === val[k]){
                                        entry[1] += 1;
                                    }
                                })
                            }
                        }
                    })

                    entries5.forEach((entry) => {
                        entries6.forEach((entry2) => {
                            if(entry[1]===1 && entry2[1]===3 && entry[0] === entry2[0]){
                                letters.push(entry[0]);
                                add = false;
                            }
                        })
                    })
                    break;

                case 4: //find mid
                    valArr.slice(i, i+10).forEach((val) => {
                        if(val.length === 2 && add){
                            newString = val.concat(letters[0]).concat(letters[1]).concat(letters[2]).concat(letters[3]);
                            letters.push(findUncommon2(allLetters, newString)[0]);
                            add = false;
                        }
                    })
                    break;

                case 5: //find top-right
                    valArr.slice(i, i+10).forEach((val) => {
                        if(val.length === 5){
                            for(let k=0; k<val.length; ++k){
                                entries5.forEach((entry, index) => {
                                    if(entry[0] === val[k]){
                                        entry[1] += 1;
                                    }
                                })
                            }
                        }
                        else if(val.length === 6){
                            for(let k=0; k<val.length; ++k){
                                entries6.forEach((entry, index) => {
                                    if(entry[0] === val[k]){
                                        entry[1] += 1;
                                    }
                                })
                            }
                        }
                    })

                    entries5.forEach((entry) => {
                        entries6.forEach((entry2) => {
                            if(entry[1]===2 && entry2[1]===2 && entry[0] === entry2[0]){
                                letters.push(entry[0]);
                                add = false;
                            }
                        })
                    })
                    break;

                case 6: //find bot-right
                    newString = "".concat(letters[0]).concat(letters[1]).concat(letters[2]).concat(letters[3]).concat(letters[4]).concat(letters[5]);
                    letters.push(findUncommon2(newString, allLetters)[0]);
                    break;
            }
        }
        console.log("Line: ", i/14+1, letters)

        let zero = "".concat(letters[0]).concat(letters[1]).concat(letters[2]).concat(letters[3]).concat(letters[5]).concat(letters[6]);
        let one = "".concat(letters[5]).concat(letters[6]);
        let two = "".concat(letters[0]).concat(letters[5]).concat(letters[4]).concat(letters[2]).concat(letters[1]);
        let three = "".concat(letters[0]).concat(letters[5]).concat(letters[4]).concat(letters[6]).concat(letters[1]);
        let four = "".concat(letters[3]).concat(letters[4]).concat(letters[5]).concat(letters[6]);
        let five = "".concat(letters[0]).concat(letters[3]).concat(letters[4]).concat(letters[6]).concat(letters[1]);
        let six = "".concat(letters[0]).concat(letters[3]).concat(letters[4]).concat(letters[6]).concat(letters[2]).concat(letters[1]);
        let seven = "".concat(letters[0]).concat(letters[5]).concat(letters[6]);
        let eight = "".concat(letters[0]).concat(letters[1]).concat(letters[2]).concat(letters[3]).concat(letters[4]).concat(letters[5]).concat(letters[6]);
        let nine = "".concat(letters[0]).concat(letters[3]).concat(letters[4]).concat(letters[5]).concat(letters[6]).concat(letters[1]);

        //Letters obtained
        let num = 0;
        for(let j=0; j<4; ++j){
            if(findUncommon2(zero, valArr[i+j+10]).length === 0){
                num += 0*Math.pow(10, 3-j);
            }
            else if(findUncommon2(one, valArr[i+j+10]).length === 0){
                num += 1*Math.pow(10, 3-j);
            }
            else if(findUncommon2(two, valArr[i+j+10]).length === 0){
                num += 2*Math.pow(10, 3-j);
            }
            else if(findUncommon2(three, valArr[i+j+10]).length === 0){
                num += 3*Math.pow(10, 3-j);
            }
            else if(findUncommon2(four, valArr[i+j+10]).length === 0){
                num += 4*Math.pow(10, 3-j);
            }
            else if(findUncommon2(five, valArr[i+j+10]).length === 0){
                num += 5*Math.pow(10, 3-j);
            }
            else if(findUncommon2(six, valArr[i+j+10]).length === 0){
                num += 6*Math.pow(10, 3-j);
            }
            else if(findUncommon2(seven, valArr[i+j+10]).length === 0){
                num += 7*Math.pow(10, 3-j);
            }
            else if(findUncommon2(eight, valArr[i+j+10]).length === 0){
                num += 8*Math.pow(10, 3-j);
            }
            else if(findUncommon2(nine, valArr[i+j+10]).length === 0){
                num += 9*Math.pow(10, 3-j);
            }
        }
        console.log("Num: ", num);
        ans2 += num;
    }
    console.log("ans2:", ans2)
    console.log("letter map:", letters);
}

main()