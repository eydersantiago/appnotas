import { addNewEmptyNote, clearNotesLogout, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setImgsToActiveNote, setNotes, setSaving, updateNotes } from "../../../src/store/journal/journalSlice";
import { imgsUrls, initialState, newNote, notes, stateActiveNote, updateNote } from "../../fixtures/journalFixture";

describe('Pruebas en journalSlice', () => {
    test('debe de regresar el initialState y llamarse el "journal"', () => {

        expect(journalSlice.name).toBe("journal");
        const state = journalSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);

    });

    test('addNewEmptyNote debe de agregar una nueva nota', () => {

        const state = journalSlice.reducer(initialState, addNewEmptyNote(newNote));
        expect(state.notes).toContain(newNote);
        expect(state.isSaving).toBeFalsy();

    });

    test('setActiveNote debe de poner una nota como activa', () => {

        const state = journalSlice.reducer(initialState, setActiveNote(newNote));
        expect(state.active).toEqual(newNote);

    });

    test('setNotes debe de guardar las notas del usuario', () => {

        const state = journalSlice.reducer(initialState, setNotes(notes));
        expect(state.notes).toEqual(notes);

    });

    test('setSaving debe de cambiar el isSaving en true y el savedMessage con comillas vacias', () => {

        const state = journalSlice.reducer(initialState, setSaving());
        expect(state.isSaving).toBeTruthy();
        expect(state.savedMessage).toBe('');

    });

    test('updateNotes debe de actualizar una nota, poner el isSaving en false y el savedMessage como "titulo de la nota", actualizada correctamente', () => {

        const stateInitial = journalSlice.reducer(initialState, setNotes(notes));
        expect(stateInitial.notes).toEqual(notes);

        const stateUpdated = journalSlice.reducer(stateInitial, updateNotes(updateNote));

        expect(stateUpdated.isSaving).toBeFalsy();
        expect(stateUpdated.notes).toContain(updateNote);
        expect(stateUpdated.savedMessage).toBe(updateNote.title + ', actualizada correctamente');

    });

    test('savingNewNote debe de cambiar el isSaving en true', () => {

        const state = journalSlice.reducer(initialState, savingNewNote());
        expect(state.isSaving).toBeTruthy();

    });

    test('setImgsToActiveNote debe de poner imagenes en el arreglo de imgsUrls de la nota activa y el isSaving en false', () => {

        const state = journalSlice.reducer(stateActiveNote, setImgsToActiveNote(imgsUrls));

        expect(state.active.imgsUrls).toEqual(imgsUrls);
        expect(state.isSaving).toBeFalsy();
    });

    test('clearNotesLogout debe de ser igual al initialState', () => {

        const state = journalSlice.reducer(stateActiveNote, clearNotesLogout());
        expect(state).toEqual(initialState);

    });

    test('deleteNoteById debe de elimitar una nota por su id', () => {

        const state = journalSlice.reducer(stateActiveNote, deleteNoteById('ABC123'));
        expect(state).toEqual({
            isSaving: false,
            savedMessage: '',
            notes: [{
                id: 'QnAVWgK4Rk4aIHT6FMqX',
                title: 'Viernes',
                imgsUrls: [
                    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790356/journal/qjzxuernzxicuwsq7ypt.png',
                    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/ooh0t66syg3dws4jose8.png',
                    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790355/journal/wm6obq31ip8pwhhwt0n3.png',
                    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/icnt6mblvwm4oqumbj5m.png'
                ],
                date: 1665790316706,
                body: 'Me la pase muy bien en mi oficina propia :) '
            },
            {
                id: 'sdfasdfewqEWRQWerqWER',
                title: 'Jueves',
                imgsUrls: [
                    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790356/journal/qjzxuernzxicuwsq7ypt.png',
                    'https://res.cloudinary.com/dqslkmm64/image/upload/v1665790354/journal/ooh0t66syg3dws4jose8.png',
                ],
                date: 1665790316706,
                body: 'Me la pase muy bien en mi oficina propia x2 :) '
            },],
            active: null
        });

    });

});