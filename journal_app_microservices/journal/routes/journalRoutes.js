// routes/firebaseRoutes.js
import express from 'express';
import { startNewNote, 
    startLoadingNotes, 
    startSavingNotes, 
    // startUploadingFiles, 
    startDeletingNote 
} from '../journalController.js';

const router = express.Router();

router.post('/newNote', startNewNote);
router.post('/loadNotes', startLoadingNotes);
router.put('/saveNote', startSavingNotes);
// router.post('/uploadFile', startUploadingFiles);
router.post('/deleteNote', startDeletingNote);

export default router;
