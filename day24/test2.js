let x = 0;
let z = 13;
let digit = 2;

//type 1 example
x = (z % 26) + 13; //The 13 changes from line to line
z = Math.floor(z / 1); //could be 1 or 26
if(x !== digit){
    z = (z * 26) + digit + 15; //15 can change
}

//type 2 example
x = (z % 26) + -11; //The 13 changes from line to line
z = Math.floor(z / 26); //could be 1 or 26
if(x !== digit){
    z = (z * 26) + digit + 10; //15 can change
}
console.log(z);