const util = require("util");
let fs = require("fs");
const { relative } = require("path/posix");
let input = fs.readFileSync("input.txt").toString().split("\r\n\r\n");

//Split by line now
input = input.map((scanner) => scanner.split("\r\n"));

//filter out --- scanner... rows
input = input.map((arr) => arr.filter((e) => e.substring(0, 3) !== "---"));

//Split beacon string on ',' and convert to integers
input = input.map((beaconArr) => beaconArr.map((beaconListing) =>{
    let tempArr = beaconListing.split(',')
    return tempArr.map((beaconString) => parseInt(beaconString));
}))

//input goes [][][] 1.scanner choice, 2.beacon choice, 3.coordinate choice
//Javascript keys are always strings!

let scanRel0 = {}; //Scanner positions relative to scanner0 [0,0,0]. THESE SCANNERS ARE IN THE SAME ORIENTATION AS SCANNER0
let beacRel0 = []; //Beacon positions relative to scanner0 [0,0,0]
let scanned = [];
let dir = {};

function main(){
    input.forEach((e) => scanned.push(false)); //At the beginning none have scanned

    //Add inital scanner at scanRel0
    scanRel0[0] = [0, 0, 0];

    //Add all inital beacons at scanner0
    for(let i=0; i<input[0].length; ++i){
        beacRel0.push(input[0][i]);
    }

    let runner = true;
    while(Object.keys(scanRel0).length < input.length && runner){ //Keep loop going until all scanners positions are known relative to scanner0
        let keys = Object.keys(scanRel0);
        keys = keys.map((scanNum) => parseInt(scanNum)); //Convert key strings into integers
        console.log("keys", keys);
        let leftScanner = unscannedKeys(keys, scanned); //leftScanner are all the scanners in scanner0 orientation but haven't scanned yet
        console.log("leftScanner", leftScanner);
        console.log("scanned", scanned);
        if(leftScanner.length === 0){
            runner = false;
        }

        //Need to have each scanner scan against scanners that have NOT scanned yet
        for(let i=0; i<leftScanner.length; ++i){
            for(let k=0; k<input.length; ++k){
                if(!scanned[k] && leftScanner[i] !== k){ //Don't scan against yourself
                    scan(input[leftScanner[i]], input[k], leftScanner[i], k);
                }
            }
        }
    }

    //Part2 - Calculate manhattan distance
    let manhattan = 0;
    let temp = 0;
    let scanValues = Object.values(scanRel0);
    console.log("scanRel0", scanValues);
    for(let i=0; i<scanValues.length; ++i){
        for(let j=i+1; j<scanValues.length; ++j){
            temp = calculateManhattan(scanValues[i], scanValues[j]);
            if(temp>manhattan){
                manhattan = temp;
            }
        }
    }

    console.log("scanRel0", scanRel0);
    console.log("beacRel0", beacRel0);
    console.log("Beacon amount", beacRel0.length);
    console.log("Manhattan", manhattan);
    console.log("Finished");
}

function convertEntry(entry, facing){
    let retEntry = [0, 0, 0]
    switch(facing){
        case "x":
            retEntry[0] = entry[0]
            retEntry[1] = entry[1]
            retEntry[2] = entry[2]
            dir['x'] = true;
            break;
        case "-x":
            retEntry[0] = -entry[0]
            retEntry[1] = -entry[1]
            retEntry[2] = entry[2]
            dir['-x'] = true;
            break;
        case "y":
            retEntry[0] = -entry[1]
            retEntry[1] = entry[0]
            retEntry[2] = entry[2]
            dir['y'] = true;
            break;
        case "-y":
            retEntry[0] = entry[1]
            retEntry[1] = -entry[0]
            retEntry[2] = entry[2]
            dir['-y'] = true;
            break;
        case "z":
            retEntry[0] = -entry[2]
            retEntry[1] = entry[1]
            retEntry[2] = entry[0]
            dir['z'] = true;
            break;
        case "-z": //Here
            retEntry[0] = entry[2]
            retEntry[1] = entry[1]
            retEntry[2] = -entry[0]
            dir['-z'] = true;
            break;
        default:
            console.log("You eneted default case, THIS SHOULDN'T HAPPEN!!!");
            break;
    }
    return retEntry;
}

function relativeEqual(one1, one2, two1, two2){
    let pos = true;

    let temp1 = [one2[0]-one1[0], one2[1]-one1[1], one2[2]-one1[2]];
    let temp2 = [two2[0]-two1[0], two2[1]-two1[1], two2[2]-two1[2]];

    if(temp1[0] === temp2[0]){
        pos = true;
    }
    else if(temp1[0] === -temp2[0]){
        pos = false;
    }
    else{
        return false;
    }

    for(let i=0; i<3; ++i){
        if(pos){
            if(temp1[i] !== temp2[i]){
                return false;
            }
        }
        else if(!pos){
            if(temp1[i] !== -temp2[i]){
                return false;
            }
        }
    }

    return [true, pos];
}

function rotate90(beacon){
    return [beacon[0], beacon[2], -beacon[1]];
}

function modifyScanner(instruction, scanner){
    let newScanner = [];
    if(instruction === "rotate"){
        for(let i=0; i<scanner.length; ++i){
            newScanner.push(rotate90(scanner[i]));
        }
    }
    else{
        for(let i=0; i<scanner.length; ++i){
            newScanner.push(convertEntry(scanner[i], instruction));
        }
    }
    return newScanner;
}

//Returns the scanners that have not scanned yet, but are known relative to scanner0 and are in scanner0's orientation
function unscannedKeys(keys, scanned){
    let uKeys = [];
    keys.forEach((key) => {
        if(scanned[key] === false){
            uKeys.push(key);
        }
    })
    return uKeys;
}

//lscan is already in scanner0 orientation, don't modify it
function scan(lscan, rscan, lnum, rnum){
    let tempRScanner = [];
    let commonBeacons = {};
    let beaconPairs = {};

    //Indicate that this scanner has scanned
    scanned[lnum] = true;

    for(let i=0; i<6; ++i){
        switch(i){
            case 0:
                tempRScanner = modifyScanner('x', rscan);
                break;
            case 1:
                tempRScanner = modifyScanner('-x', rscan);
                break;
            case 2:
                tempRScanner = modifyScanner('y', rscan);
                break;
            case 3:
                tempRScanner = modifyScanner('-y', rscan);
                break;
            case 4:
                tempRScanner = modifyScanner('z', rscan);
                break;
            case 5:
                tempRScanner = modifyScanner('-z', rscan);
                break;     
        }

        for(let j=0; j<4; ++j){
            commonBeacons = {};
            beaconPairs = {};
            //Find out if 12 common beacons
            commBeacons(lscan, tempRScanner, commonBeacons, beaconPairs);
            if(Object.keys(commonBeacons).length>=12){ //12 or more beacons, we're in scanner0 orientation
                rscan = tempRScanner; //Set rscan to the correct position
                input[rnum] = rscan;
                console.log(`commonBeacons.length ${Object.keys(commonBeacons).length}, lscanner ${lnum}, rscanner ${rnum}`);
                addScannerAndBeacons(lscan, rscan, beaconPairs, lnum, rnum);
                //return;
            }
            //If not rotate and try again
            tempRScanner = modifyScanner("rotate", tempRScanner);
        }
    }
}

//Function should find any common beacon pairs and add them to the commonBeacons object for the left scanner
function commBeacons(lscan, rscan, commonBeacons, beaconPairs){
    let retVal = [];
    for(let i=0; i<lscan.length; ++i){
        for(let j=i+1; j<lscan.length; ++j){
            for(let k=0; k<rscan.length; ++k){
                for(let l=k+1; l<rscan.length; ++l){
                    retVal = relativeEqual(lscan[i], lscan[j], rscan[k], rscan[l]);
                    if(retVal[0]){
                        commonBeacons[i] = true;
                        commonBeacons[j] = true;

                        if(retVal[1]){
                            beaconPairs[i] = k;
                            beaconPairs[j] = l;
                        }
                        else if(!retVal[1]){
                            beaconPairs[i] = l;
                            beaconPairs[j] = k;
                        }
                    }
                }
            }
        }
    }
}

function addScannerAndBeacons(lscan, rscan, beaconPairs, lnum, rnum){
    //Add the right scanner to the scanRel0
    let beaconPairEntries = Object.entries(beaconPairs);
    beaconPairEntries = beaconPairEntries.map((pair) => pair.map((i) => parseInt(i)));
    let negRightBeac = rscan[beaconPairEntries[0][1]].map((e) => -e);
    let rDiff = lscan[beaconPairEntries[0][0]].map((e, i) => e+negRightBeac[i]);
    scanRel0[rnum] = scanRel0[lnum].map((e, i) => e+rDiff[i]); //Adds rscan to scanRel0

    //Add all beacons to beacRel0 (if they haven't been added yet)
    for(let i=0; i<lscan.length; ++i){
        //Calculate beacon relative to 0
        let beaconRel0 = scanRel0[lnum].map((e,j) => e+lscan[i][j]);
        if(!beaconInArr(beaconRel0)){
            beacRel0.push(beaconRel0);
        }
    }
    for(let i=0; i<rscan.length; ++i){
        //Calculate beacon relative to 0
        let beaconRel0 = scanRel0[rnum].map((e,j) => e+rscan[i][j]);
        if(!beaconInArr(beaconRel0)){
            beacRel0.push(beaconRel0);
        }
    }
}

function beaconInArr(beaconRel0){
    for(let i=0; i<beacRel0.length; ++i){
        let runner = true;
        for(let k=0; k<3; ++k){
            if(beaconRel0[k] !== beacRel0[i][k]){
                runner = false;
            }
        }
        if(runner){
            return true;
        }
    }
    return false;
}

function calculateManhattan(val1, val2){
    let manhattan = 0;
    val1.forEach((e,i) => {
        let temp = e-val2[i];
        if(temp<0){
            temp = -temp;
        }
        manhattan += temp;
    })
    return manhattan;
}

main();