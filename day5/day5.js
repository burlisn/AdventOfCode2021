const util = require("util")
//console.log(util.inspect(array, {maxArrayLength: null}))

let fs = require('fs')
let inputArr = fs.readFileSync("input.txt").toString().split('\r\n')
let grid = Array.from({ length: 1000 }, () => Array.from({ length: 1000 }, () => 0))

const main = () => {
    let overlapTot = 0;

    inputArr.forEach((val) => {
        let lineSplit = val.split(" -> ")
        let x1 = parseFloat(lineSplit[0].split(",")[0])
        let y1 = parseFloat(lineSplit[0].split(",")[1])
        let x2 = parseFloat(lineSplit[1].split(",")[0])
        let y2 = parseFloat(lineSplit[1].split(",")[1])

        if(x1 === x2){ //Vertical
            let ydiff = 0
            if(y2 > y1){ //y2>y1
                ydiff = y2-y1
                for(let i=0; i<=ydiff; ++i){
                    ++grid[x1][y1+i]
                }
            } 
            else if(y2 < y1){
                ydiff = y1-y2 //y1>y2
                for(let i=0; i<=ydiff; ++i){
                    ++grid[x1][y2+i]
                }
            }
            else{
                ++grid[x1][y1]
            }
        } else if(y1 === y2){ //Horizontal
            let xdiff = 0
            if(x2 > x1){ //x2>x1
                xdiff = x2-x1
                for(let i=0; i<=xdiff; ++i){
                    ++grid[x1+i][y1]
                }
            } 
            else if(x2 < x1){ //x1>x2
                xdiff = x1-x2
                for(let i=0; i<=xdiff; ++i){
                    ++grid[x2+i][y1]
                }
            }
            else{
                ++grid[x1][y1]
            }
        } else if(x1 !== x2 && y1 !== y2) { //Diagonal
            let diff = 0
            if(x2 > x1 && y2 > y1){ //Northeast
                diff = x2-x1
                for(let i=0; i<=diff; ++i){
                    ++grid[x1+i][y1+i]
                }
            }
            else if(x2 < x1 && y2 > y1){ //Northwest
                diff = y2-y1
                for(let i=0; i<=diff; ++i){
                    ++grid[x1-i][y1+i]
                }
            }
            else if(x2 > x1 && y2 < y1){ //Southeast
                diff = x2-x1
                for(let i=0; i<=diff; ++i){
                    ++grid[x1+i][y1-i]
                }
            }
            else if(x2 < x1 && y2 < y1){ //Southwest
                diff = x1-x2
                for(let i=0; i<=diff; ++i){
                    ++grid[x1-i][y1-i]
                }
            }
        }
    })


    grid.forEach((row) => { //row is the iterator (in this case an array)
        let filtRow = row.filter((cell) => cell>1)
        overlapTot += filtRow.length
    })
    console.log(overlapTot)
}
main()
//console.log(util.inspect(inputArr, {maxArrayLength: null}))
