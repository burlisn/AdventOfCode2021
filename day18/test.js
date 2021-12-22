myArr = [[14, 7], [8, 17]]

while(splitNum(myArr));

console.log(myArr);

function splitNum(num){ /*Split not working yet */
    let splitAlready = false;

    //Check left
    if(typeof(num[0]) !== "number" && !splitAlready){
        splitAlready = splitNum(num[0]);
    }
    //Check right
    if(typeof(num[1]) !== "number" && !splitAlready){
        splitAlready = splitNum(num[1]);
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
    return splitAlready;
}