function replaceAt(index, string, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}
let myString = "Hello";
myString = replaceAt(2, myString,'p');
console.log(myString);

