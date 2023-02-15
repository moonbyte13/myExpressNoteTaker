const fb = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
fb.get('/', (req, res) =>
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting a note
fb.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = (req.body);

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json')

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in adding note');
  }
});

// POST Route for deleting a note
fb.delete('/:note_id', (req, res) => {
  if(req.params.note_id){
    readAndDelete(req.params.note_id)
    
  } else {
    res.status(404).send('Note ID not found');
  }
});

module.exports = fb;
