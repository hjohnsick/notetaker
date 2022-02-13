const express = require('express');
// Instantiate the server
const app = express();
const notes = require('./db/db.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});