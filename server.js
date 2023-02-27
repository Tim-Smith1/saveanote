const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const notes = require('./db/db.json');
const { clog } = require('./middleware/clog');
//const fileNotes = require();
////const api = require('./routes/index');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
////app.use('/api', api);

app.use(express.static('public'));


//getting the notes data from the db.json file
app.get('/api/notes', (req, res) => {
    res.json(notes)
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', null, 2));
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes); 
});

// app.post('/api/notes', (req, res) => {
//     console.log("hello");
//     const AddNote = NewNote(req.body, fileNotes);
//     res.json(AddNote)
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
