import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'checking', // checking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    users: [], // Lista de usuarios
    currentUser: null, // Usuario autenticado
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload;
      state.users = [];
      state.currentUser = null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    setUsers: (state, { payload }) => {
      state.users = payload; // Ahora payload será un array
    },
    
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { login, logout, checkingCredentials, setUsers, setCurrentUser } = userSlice.actions;
