import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      isLoading: false,
      user: null,  // Usuario único
      users: [],   // Lista de usuarios si lo necesitas
      message: ''
    },
    reducers: {
      startLoading: (state) => {
        state.isLoading = true;
      },
      setUser: (state, { payload }) => { // Asegúrate de tener esta acción
        state.user = payload;
        state.isLoading = false;
      },
      setUsers: (state, { payload }) => { // Por si gestionas múltiples usuarios
        state.users = payload;
        state.isLoading = false;
      },
      updateUser: (state, { payload }) => {
        state.user = { ...state.user, ...payload };
        state.isLoading = false;
        state.message = 'Información actualizada correctamente.';
      },
      clearUserState: (state) => {
        state.isLoading = false;
        state.user = null;
        state.message = '';
      },
      deleteUser: (state) => {
        state.user = null;
        state.message = 'Cuenta eliminada correctamente.';
      },
    },
  });
  
  export const { startLoading, setUser, setUsers, updateUser, clearUserState, deleteUser } = userSlice.actions;
  