let myDict = {
    "a" : 2,
    "b" : 1,
}
let entries = Object.entries(myDict);
newDict = {};

entries.forEach((e) => {
    newDict[e[0]]  = 0;
})

console.log(myDict, newDict);