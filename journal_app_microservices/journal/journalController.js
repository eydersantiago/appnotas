import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "./firebase/config.js";
import { loadNotes } from "./firebase/providers.js";

// import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = async (req, res) => {
  try {
    const { uid } = req.body;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imgsUrls: []
    };

    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    res.status(201).json({ newNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const startLoadingNotes = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const startSavingNotes = async (req, res) => {
  try {
    const { uid, note } = req.body;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    res.status(200).json({ message: 'Nota guardada exitosamente', note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Carpeta de destino
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
  }
});

// export const startUploadingFiles = async (req, res) => {
//   const file = req.body;
//   console.log("🚀 ~ startUploadingFiles ~ file:", file)
//   if (!file) return null;


//   const formData = new FormData();
//   formData.append('upload_preset', 'react-journal');
//   formData.append('file', file);

//   const fetchOptions = {
//     method: 'POST',
//     body: formData
//   }

//   try {
//     const cloudUrl = 'https://api.cloudinary.com/v1_1/dqslkmm64/upload';

//     const resp = await fetch(cloudUrl, fetchOptions);

//     if (!resp.ok) throw new Error('No se pudo subir la imagen');

//     const cloudResp = await resp.json();

//     return cloudResp.secure_url;

//   } catch (error) {
//     /*  console.log(error);
//      throw new Error(error.message); */
//     return null;
//   }
// }

export const startDeletingNote = async (req, res) => {
  try {
    const { uid, note } = req.body;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    res.status(200).json({ message: 'Nota eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
