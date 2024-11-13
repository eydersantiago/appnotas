const { journalSave,newNote,loadNotes,deleteNote} = require('../services/journalService'); // Importa la función correcta

const journalSaveController = async (req, res, next) => {
  try {
    
    const response = await journalSave(req.body);
    res.status(200).json(response); // Devuelve la respuesta al cliente
  } catch (error) {
    next(error); // Maneja errores mediante middleware de error
  }
};

const newNoteController = async (req, res, next) => {
  try {
    
    const response = await newNote(req.body);
    res.status(200).json(response); // Devuelve la respuesta al cliente
  } catch (error) {
    next(error); // Maneja errores mediante middleware de error
  }
};
const loadNotesController = async (req, res, next) => {
  try {
    
    const response = await loadNotes(req.body);
    res.status(200).json(response); // Devuelve la respuesta al cliente
  } catch (error) {
    next(error); // Maneja errores mediante middleware de error
  }
};
const deleteNoteController = async (req, res, next) => {
  try {
    
    const response = await deleteNote(req.body);
    res.status(200).json(response); // Devuelve la respuesta al cliente
  } catch (error) {
    next(error); // Maneja errores mediante middleware de error
  }
};
module.exports = { deleteNote:deleteNoteController, loadNotes:loadNotesController ,journalSave: journalSaveController, newNote:newNoteController };
