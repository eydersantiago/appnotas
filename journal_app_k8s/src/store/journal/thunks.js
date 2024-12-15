import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setImgsToActiveNote, setNotes, setSaving, updateNotes } from "./journalSlice";
import axios from "axios";

const JOURNAL_API_URL = "http://localhost:4005/journal";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        //Obtenemos el uid de nuestro store
        const { uid } = getState().auth;

        //Generamos nuestra nota
        let newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imgsUrls: []
        }

        //Guardamos la informacion de la nota en la base de datos
        let response = await axios.post(`${JOURNAL_API_URL}/newNote`, {
            uid
        });

        newNote = response.data.newNote;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));


    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSavingNotes = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        await axios.put(`${JOURNAL_API_URL}/saveNote`, {
            uid,
            note
        });

        dispatch(updateNotes(note));

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {

        dispatch(setSaving());

        //Arreglo de promesas
        const fileUploadPromises = [];

        /* LLenamos el arreglo de promesas con la correspondiente de cada file del arreglo
        para luego ejecutarlas todas juntas */

        // for (const file of files) {
        //     fileUploadPromises.push(fileUpload(file));
        // }
        // console.log("🚀 ~ return ~ fileUploadPromises:", fileUploadPromises)

        // const imgsUrls = await Promise.all(fileUploadPromises);
        await fileUpload(files[0]);
        console.log("🚀 ~ return ~ imgsUrls:", imgsUrls)
        dispatch(setImgsToActiveNote(imgsUrls));

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        await axios.post(`${JOURNAL_API_URL}/deleteNote`, {
            uid,
            note
        });

        dispatch(deleteNoteById(note.id));

    }
}