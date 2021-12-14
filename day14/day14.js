const util = require("util")
let fs = require("fs");
const { start } = require("repl");
let inputArr = fs.readFileSync("input.txt")
                 .toString()
                 .split("\r\n\r\n");
            
let startStr = inputArr[0];
let inst = inputArr[1].split("\r\n")
                      .map((line) => line.split(" -> "));

//letters keeps track of how many letters are in ending string
let letters = {};
let pairs = {};
inst.forEach((line) => {
    letters[line[0][0]] = 0;
    letters[line[0][1]] = 0;
    letters[line[1]] = 0;
})

inst.forEach((line) => {
    pairs[line[0]] = 0;
})

const main = () => {
    //Count first pairs amounts
    for(let i=0; i<startStr.length-1; ++i){
        pairs[startStr[i]+startStr[i+1]] += 1;
    }

    //Add initial letter amount
    for(let i=0; i<startStr.length; ++i){
        letters[startStr[i]] += 1;
    }

    //Main loop
    for(let run=0; run<40; ++run){
        let entries = Object.entries(pairs);
        let tempPairs = {}

        entries.forEach((e) => { //Fill tempPairs with 0
            tempPairs[e[0]] = 0;
        })

        let ch = ''; //Index to find char to insert
        entries.forEach((line) => {
            inst.forEach((e) => { //ch === char to insert
                if(e[0] === line[0]){
                    ch = e[1];
                }
            });

            //Add the 2 new pairs to tempPairs
            if(line[1] > 0){
                console.log(line, line[0][0]+ch, ch+line[0][1]);
            }
            tempPairs[line[0][0]+ch] += line[1];
            tempPairs[ch+line[0][1]] += line[1];

            //Increase by the amount of letters added
            letters[ch] += line[1];
        })

        //Set pairs to updated
        Object.entries(tempPairs).forEach((line) => {
            pairs[line[0]] = line[1];
        })
    }

    //Print letters
    console.log(letters);
    console.log(letters['B'] - letters['P']);
}

main();