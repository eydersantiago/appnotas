const { journalSave,newNote,loadNotes,deleteNote} = require('../services/journalService');

const journalSaveController = async (req, res, next) => {
  try {
    
    const response = await journalSave(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const newNoteController = async (req, res, next) => {
  try {
    
    const response = await newNote(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loadNotesController = async (req, res, next) => {
  try {
    
    const response = await loadNotes(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteNoteController = async (req, res, next) => {
  try {
    
    const response = await deleteNote(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { deleteNote:deleteNoteController, loadNotes:loadNotesController ,journalSave: journalSaveController, newNote:newNoteController };
