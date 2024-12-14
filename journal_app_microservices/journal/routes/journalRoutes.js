import express from 'express';
import { startNewNote, startLoadingNotes, startSavingNotes, startDeletingNote } from '../journalController.js';

const router = express.Router();

router.post('/newNote', startNewNote);
router.post('/loadNotes', startLoadingNotes);
router.put('/saveNote', startSavingNotes);
router.post('/deleteNote', startDeletingNote);

export default router;
