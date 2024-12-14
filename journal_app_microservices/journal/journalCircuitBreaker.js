import CircuitBreaker from 'opossum';
import { loadNotes } from './firebase/providers.js';
import { setDoc, doc, collection } from 'firebase/firestore/lite';
import { firebaseDB } from './firebase/config.js';

// Función para cargar las notas
async function loadNotesFromFirebase(uid) {
  const notes = await loadNotes(uid);
  return notes;
}

// Función para crear una nueva nota
async function createNoteInFirebase(uid, note) {
  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
    imgsUrls: [],
  };

  const newDocRef = doc(collection(firebaseDB, `${uid}/journal/notes`));
  await setDoc(newDocRef, newNote);

  newNote.id = newDocRef.id;
  return newNote;
}

// Configuración del Circuit Breaker
const options = {
  timeout: 3000, // Tiempo máximo para la llamada
  errorThresholdPercentage: 50, // Umbral de fallos para abrir el circuito
  resetTimeout: 10000, // Tiempo para intentar cerrar el circuito
};

const circuitBreakerLoadNotes = new CircuitBreaker(loadNotesFromFirebase, options);
const circuitBreakerCreateNote = new CircuitBreaker(createNoteInFirebase, options);

// Fallback para cada operación
circuitBreakerLoadNotes.fallback(() => {
  throw new Error('Error al cargar las notas desde Firebase');
});

circuitBreakerCreateNote.fallback(() => {
  throw new Error('Error al crear la nueva nota en Firebase');
});

export { circuitBreakerLoadNotes, circuitBreakerCreateNote };

