import { circuitBreakerCreateNote } from './journalCircuitBreaker.js'; // Importar el Circuit Breaker

export const startNewNote = async (req, res) => {
  try {
    const { uid } = req.body;

    // Usar el Circuit Breaker para crear una nueva nota
    const newNote = await circuitBreakerCreateNote.fire(uid);

    res.status(201).json({ newNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
