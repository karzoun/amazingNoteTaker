const db = require("../db/db");
const router = require("express").Router();

router.get("/notes", (req, res) => {
    db
        .getNotes()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
    db
        .addNote(req.body)
        .then((note) => {
            res.json(note);
            console.log("res.body: ", res.body);
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