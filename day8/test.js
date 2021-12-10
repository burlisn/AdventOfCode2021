let letterMap = {
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0
}

let entries5 = Object.entries(letterMap);

entries5.forEach((entry) => {
    console.log(entry[0], entry[1]);
})

entries5.forEach((entry, index) => {
    entry[1] = 1;
})

console.log(entries5);