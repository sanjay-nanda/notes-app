const fs = require("fs");
const chalk = require("chalk");
const getNotes = function() {
    return "Your notes..."
}

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync("notes.json");
        const dataString = notesBuffer.toString();
        return JSON.parse(dataString);
    } catch(e) {
        return []
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync("notes.json", JSON.stringify(notes))
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) =>note.title === title
    )

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse("New Note Added!"));
        saveNotes(notes);
    }
    else{
        console.log(chalk.red.inverse("Title already taken!"));
    }
}

const remNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(function(note) {
        return note.title !== title;
    });

    if(notes.length !== notesToKeep.length){
        console.log(chalk.green.inverse("Note removed!"))
        saveNotes(notesToKeep);
    }
    else{
        console.log(chalk.red.inverse("Note Not Found!"));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    notes.forEach(note => {
        console.log(note.title + " : " + note.body);
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    const n = notes.find((note) => note.title === title)

    if(n){
        console.log(chalk.inverse("Note Found"));
        console.log(n.title + ": " + n.body)
    }
    else{
        console.log(chalk.red.inverse("Note not found!"));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    remNote: remNote,
    listNotes: listNotes,
    readNote: readNote
}