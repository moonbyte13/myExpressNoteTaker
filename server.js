const express = require('express');
const path = require('path');
const { cLog } = require('./middleware/cLog.js');
const { readFromFile } = require('./helpers/fsUtils');
const api = require('./routes/index.js');

const PORT = 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(cLog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for json
app.get('/api/notes', api);

// Get Route for individual note
app.get('/api/note/:note_id', (req, res) => {
  if(req.params.note_id){
    // console.info(`${req.method} request received to get a single a note`);
    const noteId = req.params.note_id
    readFromFile('./db/db.json')
      .then((data) => {
        const parsedData = JSON.parse(data)
        for(let i=0; i < parsedData.length; i++){
          const currentNote = parsedData[i]
          // console.log(currentNote.note_id + noteId);
          if(currentNote.note_id === noteId){
            res.status(200).json(currentNote);
            // console.log(currentNote);
            return;
          }
        }
        res.status(404).send('Note ID not found');
      })
  } else {
    res.status(400).send('Note ID not provided');
  }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
