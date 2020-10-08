const util = require("util"); // promisify function
const fs = require("fs"); // read and wrtie

//promisify read and wrtie functuions
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

class db {

    read() {
        return readFilePromise("db/db.json", "utf8");
    }

    write(note) {
        return writeFilePromise("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    addNote(note) {
        return this.getNotes()
            .then((notes) => {
                notes.push(note)
            })
            .then((newNotes) => {
                this.write(newNotes)
            })
            .then(() => {
                return note;
            });
    }

    removeNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new db;