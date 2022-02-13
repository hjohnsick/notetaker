const express = require('express');
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
// Instantiate the server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const notes = require('./db/db.json');
const generateUniqueId = require('generate-unique-id');

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { note } = req.body;

    // If note is present
    if (req.body) {
        // Variable for the object we will save
        const newNote = {
            note,
            note_id: generateUniqueId()
        };

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

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});