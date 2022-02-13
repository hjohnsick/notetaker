const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require("fs");
const generateUniqueId = require('generate-unique-id');

router.get('/api/notes', (req, res) => {
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If note is present
    if (req.body) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            note_id: generateUniqueId()
        };
        notes.push(newNote)
        console.log(newNote)
        // Convert the data to a string so we can save it
        fs.readFile(`./db/db.json`, `UTF8`, (error, data) => {
            if (error) {
                console.log(error);
            }
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            // Write the string to a file
            fs.writeFile(`./db/db.json`, JSON.stringify(parsedData), (err) => 
                err ? console.error(err) : console.log(``)
            )
        });

        const response = {
            status: "success",
            body: newNote
        };

        console.log(response);
        res.json(response);
    } else {
        res.json("Error in posting note");
    }
});

module.exports = router;