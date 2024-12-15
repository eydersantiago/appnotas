const CircuitBreaker = require('opossum');
const {
  journalSave,
  newNote,
  loadNotes,
  deleteNote,
} = require('../services/journalService');

// Opciones generales del circuit breaker
const options = {
  timeout: 3000, // Tiempo máximo para la operación
  errorThresholdPercentage: 50, // Umbral de error para abrir el circuito
  resetTimeout: 10000, // Tiempo para intentar cerrar el circuito
};

// Configuración del circuito para cada servicio
const journalSaveCircuit = new CircuitBreaker(journalSave, options);
const newNoteCircuit = new CircuitBreaker(newNote, options);
const loadNotesCircuit = new CircuitBreaker(loadNotes, options);
const deleteNoteCircuit = new CircuitBreaker(deleteNote, options);

// Fallbacks (opcional, si quieres agregar comportamiento en caso de fallo)
journalSaveCircuit.fallback(() => ({
  error: 'Fallback: journalSave service is unavailable',
}));
newNoteCircuit.fallback(() => ({
  error: 'Fallback: newNote service is unavailable',
}));
loadNotesCircuit.fallback(() => ({
  error: 'Fallback: loadNotes service is unavailable',
}));
deleteNoteCircuit.fallback(() => ({
  error: 'Fallback: deleteNote service is unavailable',
}));

// Controladores con circuit breaker
const journalSaveController = async (req, res, next) => {
  try {
    const response = await journalSaveCircuit.fire(req.body);
    res.status(200).json(response);
  } catch (error) {
    // Redirigir al error-pages
    res.redirect('http://localhost:8080/410.html');
  }
};

const newNoteController = async (req, res, next) => {
  try {
    const response = await newNoteCircuit.fire(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.redirect('http://localhost:8080/410.html');
  }
};

const loadNotesController = async (req, res, next) => {
  try {
    const response = await loadNotesCircuit.fire(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.redirect('http://localhost:8080/410.html');
  }
};

const deleteNoteController = async (req, res, next) => {
  try {
    const response = await deleteNoteCircuit.fire(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.redirect('http://localhost:8080/410.html');
  }
};

module.exports = {
  deleteNote: deleteNoteController,
  loadNotes: loadNotesController,
  journalSave: journalSaveController,
  newNote: newNoteController,
};
