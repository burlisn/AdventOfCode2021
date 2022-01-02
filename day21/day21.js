const util = require("util");
let fs = require("fs");
let input = fs.readFileSync("input.txt").toString().split("\r\n");

let DP = {};

function ans1(){
    let dieValue = 1;
    let p1Pos = 8;
    let p2Pos = 6;

    let p1Score = 0;
    let p2Score = 0;

    let retArr = [];
    let loser = true;
    let ans1 = 0;

    while(true){
        retArr = roll3(p1Pos, dieValue);
        p1Score += retArr[0];
        p1Pos = retArr[0];
        dieValue = retArr[1];
        if(p1Score>=1000){
            loser = false;
            break;
        }

        retArr = roll3(p2Pos, dieValue);
        p2Score += retArr[0];
        p2Pos = retArr[0];
        dieValue = retArr[1];
        if(p2Score>=1000){
            loser = true;
            break;
        }
    }

    if(!loser){
        ans1 = p2Score * (dieValue-1);
    }
    else if(loser){
        ans1 = p1Score * (dieValue-1);
    }
    console.log(ans1)
}

function ans2(){
    var win_num = count_win(7, 5, 0, 0);
    console.log(win_num);
}

function count_win(p1, p2, s1, s2){
    if(s1 >= 21){
        return [1, 0];
    }
    if(s2 >= 21){
        return [0, 1];
    }
    if(typeof(DP[`${p1} ${p2} ${s1} ${s2}`]) !== "undefined"){
        return DP[`${p1} ${p2} ${s1} ${s2}`];
    }
    let ans = [0,0];
    for(let d1=1; d1<4; d1++){
        for(let d2=1; d2<4; d2++){
            for(let d3=1; d3<4; d3++){
                var new_p1 = (p1+d1+d2+d3)%10;
                var new_s1 = s1 + new_p1 + 1;

                let ret_val = count_win(p2, new_p1, s2, new_s1);
                let x1 = ret_val[0];
                let y1 = ret_val[1];

                ans = [ans[0]+y1, ans[1]+x1];
            }
        }
    }
    DP[`${p1} ${p2} ${s1} ${s2}`] = ans;
    return ans;
}

function rRoll3(p1Pos, p2Pos, p1Score, p2Score, turnBool){
    if(!turnBool){
        for(let i=1; i<4; i++){

        }
    }
}

function roll3(pPos, dieValue){
    let movVal = 0;
    for(let roll=0; roll<3; roll++){
        movVal += dieValue;
        dieValue += 1;
    }

    while(movVal>0){
        pPos += 1;
        if(pPos>10){
            pPos = 1;
        }
        movVal -= 1;
    }

    return [pPos, dieValue];
}

ans2();