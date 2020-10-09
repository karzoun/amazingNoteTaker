const db = require("../db/db");
const router = require("express").Router();

router.get("/notes", (req, res) => {
    db
        .getNotes()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
    console.log(req.body)
    let noteToSave = req.body
        // you need to add a uniq id to each note (to add new keys to objects = noteToSave.id=1)

    noteToSave = JSON.stringify(noteToSave)
    db
        .addNote(noteToSave)
        .then((note) => {
            res.json(note);

        })
        .catch((err) => res.status(500).json(err));
});

router.delete("/notes/:id", (req, res) => {
    db
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;