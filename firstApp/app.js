const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');

var command = process.argv[2];
const argv = yargs
.command('add', 'Add a new note', {
    title: {
        describe: 'Title of note',
        demand: true,
        alias: 't'
    },
    body: {
        describe: 'Body of note',
        demand: true,
        alias: 'b'
    }
})
.help()
.argv;

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
}else if(command === 'list'){
    var notesList = notes.getAll();
    var message = notes ? "Pobrano listę wszystkich tytułów" : "Nie istnieje taki tytuł";

    notesList.forEach((note) => {
        console.log(note.title + ' ' + note.body);
    })
}
