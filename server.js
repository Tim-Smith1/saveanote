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
    const notesAsJson = fs.readFileSync('./db/db.json');
    const notes = JSON.parse(notesAsJson);
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    console.log(req.params.id);////
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes); 
    
});

// app.delete(`/api/notes/:id`, (req, res) => {
//  const notes = JSON.parse(fs.readFileSync('./db/db.json')); 
//  const idToDelete = req.params.id;    
//  const notesWithoutDeletedNote = notes.filter(function (notes) {
//   // if the note does not match the delete note
//   // -- let that note thru
//     if (notes.id !== idToDelete) {
//       return notes;
//     } else {
//       return 
//     }

    
//  })
// //writeFileSync
// fs.writeToFile('./db/db.json', JSON.stringify(notes));
// res.json(notesWithoutDeletedNote)
     
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
