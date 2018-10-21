console.log('Starting app');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');

var command = process.argv[2];
const argv = yargs.argv;

console.log("Command: ", command);
// console.log("Process: ", process.argv);
console.log("Yargs: ", argv);

if(command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note === undefined) console.log('Nie istnieje taki tytuł ani ciało');
    else console.log('Dodano odpowedni tytuł:', argv.title, 'oraz ciało: ', argv.body);
}else if(command === 'remove'){
    if(notes.removeNote(argv.title)) console.log("Usunięto tytuł: ", argv.title);
    else console.log("Nie usunięto nic z tablicy");
}else if(command === 'get'){
    var note = notes.getNote(argv.title);
    var message = note ? "Pobrano tytuł: " + note.title + " o ciele: " + note.body  : "Nie istnieje taki tytuł";
    console.log(message);
}
