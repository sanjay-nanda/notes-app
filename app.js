const notes = require("./notes");
const { argv } = require("yargs");
const yargs = require("yargs");
const { listNotes } = require("./notes");

//add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: 'string'   
        }
    },
    handler(){
        notes.addNote(argv.title, argv.body)
    }
});

//command to remove
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string',
        }
    },
    handler(){
        notes.remNote(argv.title)
    }
});

//command for listing
yargs.command({
    command: "list",
    describe: "List all notes",
    handler(){
        notes.listNotes()
    }
})

//edit command
yargs.command({
    command: "read",
    describe: "Read one note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.readNote(argv.title)
    }
})

yargs.parse();