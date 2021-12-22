const util = require("util");
let fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

let binStr = '';

//Convert input string to bin string
for(let i=0; i<input.length; ++i){
    binStr += dec2BinStr(parseInt(input[i], 16));
}

//Var declaration
let verSum = 0;

const main = () => {
    let ans2 = ['', ''];

    ans2 = evalPacket(0);
    console.log(verSum);
    console.log(ans2[0]);
}

//Takes decimal number and returns string in binary (4 bits)
function dec2BinStr(dec){
    let retStr = (dec >>> 0).toString(2);
    if(retStr.length < 4){
        let startLen = retStr.length;
        for(let i=0; i<(4-startLen); ++i){ 
            retStr = '0' + retStr;
        }
    }
    return retStr;
}

//Input: pos is the index of the first bit of a packet
//Output: Returns array. First element is the various. Second element is the starting index of
//        the next packet
function evalPacket(pos){
    let ver = '';
    let type = '';
    let lit = '';
    let findLit = true;
    let retVal = 0;
    let lenType = '';
    let totPackLen = 0;
    let totSubAmnt = 0;
    let retGrab = ['', ''];
    let val1 = 0;

    /* GET PACKET HEADER */
    //Start of packet, get version number
    ver = binStr.substring(pos, pos+3);
    pos = pos+3;
    verSum += parseInt(ver, 2);

    //Get type
    type = binStr.substring(pos, pos+3);
    pos = pos+3;

    /* EVALUATE TYPE */
    //Type is literal
    if(parseInt(type, 2) === 4){
        while(findLit){ //Find literal val
            if(binStr[pos] === '0'){
                findLit = false;
            }
            lit += binStr.substring(pos+1, pos+5);
            pos = pos+5;
        }
        //Convert lit val
        retVal = parseInt(lit, 2);

        //Return lit val and pos
        return [retVal, pos];
    }
    //Type is an operator
    else{
        //Get length type I.D.
        lenType = binStr[pos];
        pos = pos + 1; //Move pos to the start of sub-packet information

        if(lenType === '1'){ //Find subpacket amount
            totSubAmnt = parseInt(binStr.substring(pos, pos+11), 2); //Find subpacket amount
            pos = pos+11; //Update pos to first subpacket
            let min = Number.MAX_SAFE_INTEGER;
            let max = 0;
            for(let i=0; i<totSubAmnt; ++i){
                retGrab = evalPacket(pos); //Evaluate subpacket

                switch(parseInt(type, 2)){
                    case 0: //Sum
                        if(i > 0){
                            retVal += retGrab[0];
                        }
                        else{
                            retVal = retGrab[0];
                        }
                        break;
                    case 1: //Product
                        if(i > 0){
                            retVal *= retGrab[0];
                        }
                        else{
                            retVal = retGrab[0];
                        }
                        break;
                    case 2: //Minimum
                        if(retGrab[0] < min){
                            min = retGrab[0];
                            retVal = retGrab[0];
                        }
                        break;
                    case 3: //Maximum
                        if(retGrab[0] > max){
                            max = retGrab[0];
                            retVal = retGrab[0];
                        }
                        break;
                    case 5: //GT
                        if(i > 0){
                            if(val1 > retGrab[0]){
                                retVal = 1;
                            }
                            else{
                                retVal = 0;
                            }
                        }
                        else{
                            val1 = retGrab[0];
                        }
                        break;
                    case 6: //LT
                        if(i > 0){
                            if(val1 < retGrab[0]){
                                retVal = 1;
                            }
                            else{
                                retVal = 0;
                            }
                        }
                        else{
                            val1 = retGrab[0];
                        }                    
                        break;
                    case 7: //EQ
                        if(i > 0){
                            if(val1 === retGrab[0]){
                                retVal = 1;
                            }
                            else{
                                retVal = 0;
                            }
                        }
                        else{
                            val1 = retGrab[0];
                        }                 
                        break;
                    default:
                        console.log("WE'VE GOT PROBLEMS");
                        break;
                }

                pos = retGrab[1]; //Update pos with next packet
            }
            return [retVal, pos]; //Return empty val, but pos of next packet
        }
        else if(lenType === '0'){ //Find subpacket bits
            totPackLen = parseInt(binStr.substring(pos, pos+15),2);
            pos = pos+15; //Update pos to first subpacket
            let min = Number.MAX_SAFE_INTEGER;
            let max = 0;
            for(let i=0; i<totPackLen;){
                retGrab = evalPacket(pos); //Evaluate subpacket

                switch(parseInt(type, 2)){
                    case 0: //Sum
                        if(i > 0){
                            retVal += retGrab[0];
                        }
                        else{
                            retVal = retGrab[0];
                        }
                        break;
                    case 1: //Product
                        if(i > 0){
                            retVal *= retGrab[0];
                        }
                        else{
                            retVal = retGrab[0];
                        }
                        break;
                    case 2: //Minimum
                        if(retGrab[0] < min){
                            min = retGrab[0];
                            retVal = retGrab[0];
                        }
                        break;
                    case 3: //Maximum
                        if(retGrab[0] > max){
                            max = retGrab[0];
                            retVal = retGrab[0];
                        }
                        break;
                    case 5: //GT
                        if(i > 0){
                            if(val1 > retGrab[0]){
                                retVal = 1;
                            }
                            else{
                                retVal = 0;
                            }
                        }
                        else{
                            val1 = retGrab[0];
                        }
                        break;
                    case 6: //LT
                        if(i > 0){
                            if(val1 < retGrab[0]){
                                retVal = 1;
                            }
                            else{
                                retVal = 0;
                            }
                        }
                        else{
                            val1 = retGrab[0];
                        }                    
                        break;
                    case 7: //EQ
                        if(i > 0){
                            if(val1 === retGrab[0]){
                                retVal = 1;
                            }
                            else{
                                retVal = 0;
                            }
                        }
                        else{
                            val1 = retGrab[0];
                        }                 
                        break;
                    default:
                        console.log("WE'VE GOT PROBLEMS");
                        break;
                }

                i += retGrab[1] - pos; //Update i
                pos = retGrab[1]; //Update pos with next packet
            }
            return [retVal, pos]; //Return empty val, but pos of next packet
        }
    }
}

main()