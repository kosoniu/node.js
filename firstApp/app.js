console.log('Starting app');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');

var string = [1,2,3,1,2,3,4,5,6,5,4,3,12];

console.log(_.uniq(string));


// console.log("Result: ", notes.add(2, -3));

// fs.appendFile('greetings.txt', `Hello ${user.username}!` , function (error) {
//     if(error){
//         console.log("Unable to write to file!");
//     }
// });
