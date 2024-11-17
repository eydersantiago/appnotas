import { setUser, setUsers, startLoading, updateUser, deleteUser } from './userSlice';
import axios from 'axios';

const USER_API_URL = "http://localhost:4001/user"; // Ajusta la URL según tu entorno

// Obtener la información del usuario actual
export const fetchUser = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`${USER_API_URL}/users`);
      dispatch(setUser(response.data)); // Guarda la información del usuario en el estado global
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };
};

// Obtener todos los usuarios
export const fetchAllUsersThunk = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`${USER_API_URL}/users`);
      dispatch(setUsers(response.data.users)); // Guarda la lista de usuarios en el estado global
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };
};

// Crear un nuevo usuario
export const createUserThunk = (userData) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      await axios.post(`${USER_API_URL}/users`, userData);
      dispatch(fetchAllUsersThunk()); // Refresca la lista de usuarios después de crear uno nuevo
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };
};

// Actualizar un usuario existente
export const updateUserThunk = (uid, updatedData) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      await axios.put(`${USER_API_URL}/users`, {
        uid,
        userData: updatedData,
      });
      dispatch(updateUser(updatedData)); // Actualiza el usuario en el estado global
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };
};

// Eliminar un usuario
export const deleteUserThunk = (uid) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      await axios.delete(`${USER_API_URL}/users/${uid}`);
      dispatch(deleteUser()); // Elimina el usuario del estado global
      dispatch(fetchAllUsersThunk()); // Recarga la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };
};
