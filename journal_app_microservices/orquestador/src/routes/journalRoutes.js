const express = require('express');
const { journalSave,newNote,loadNotes,deleteNote } = require('../controllers/journalController');

const router = express.Router();

router.put('/saveNote', journalSave);
router.post('/newNote', newNote);
router.post('/loadNotes',loadNotes);
router.post('/deleteNote',deleteNote)

module.exports = router;