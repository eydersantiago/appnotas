import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imgsUrls: []
        // }

    },
    reducers: {
        addNewEmptyNote: (state, { payload }) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }) => {
            state.active = payload;
            state.savedMessage = ``;
        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.savedMessage = ``;
        },
        updateNotes: (state, { payload }) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                return note.id === payload.id
                    ? payload
                    : note
            })

            state.savedMessage = `${payload.title}, actualizada correctamente`;
        },
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        setImgsToActiveNote: (state, { payload }) => {
            state.active.imgsUrls = [...state.active.imgsUrls, ...payload]
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.savedMessage = ``;
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, { payload: id }) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== id);
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNotes,
    deleteNoteById,
    savingNewNote,
    setImgsToActiveNote,
    clearNotesLogout
} = journalSlice.actions;