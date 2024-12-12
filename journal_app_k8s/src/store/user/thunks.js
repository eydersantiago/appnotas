import { checkingCredentials, login, logout, setUsers, setCurrentUser } from "./userSlice";
import axios from "axios";

const USER_API_URL = "http://localhost:4001/user";
const AUTH_API_URL = "http://localhost:4005/auth";

export const startCheckingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

// export const startFetchingUsers = () => {
//   return async (dispatch) => {
//     try {
//       // Solicitud para obtener todos los usuarios
//       const response = await axios.get(`${USER_API_URL}/all`);
//       console.log("Usuarios obtenidos:", response.data); // Log para verificar los datos
//       dispatch(setUsers(response.data)); // Actualiza el estado con los usuarios
//     } catch (error) {
//       console.error("Error al obtener usuarios:", error);
//       dispatch(setUsers([])); // Actualiza con un array vacío en caso de error
//     }
//   };
// };


export const startFetchingUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${USER_API_URL}/all`);
      console.log("Usuarios obtenidos:", response.data); // Log para verificar los datos
      dispatch(setUsers(response.data.users)); // Envía solo el array de usuarios
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      dispatch(setUsers([])); // Actualiza con un array vacío en caso de error
    }
  };
};



export const startFetchingCurrentUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/check-auth-state`);

      const { user } = response.data;

      if (!user) {
        return dispatch(logout());
      }

      const { displayName, email, uid, photoURL } = user;

      dispatch(login({ displayName, email, uid, photoURL }));
      //dispatch(startLoadingNotes());
    } catch (error) {
      console.error("Error al verificar el estado de autenticación:", error);
      dispatch(logout());
    }
  };
};

export const startCreatingUser = ({ displayName, email, password }) => {
  return async (dispatch) => {
    try {
      // Crear un nuevo usuario
      const response = await axios.post(`${USER_API_URL}/register`, {
        displayName,
        email,
        password,
      });
      if (response.data.ok) {
        const { uid, photoURL } = response.data;
        dispatch(login({ displayName, email, uid, photoURL }));
      } else {
        dispatch(logout(response.data.errorMessage));
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      dispatch(logout("Error al registrar usuario"));
    }
  };
};

export const startLoggingOut = () => {
  return async (dispatch) => {
    try {
      await axios.post(`${USER_API_URL}/logout`);
      dispatch(logout());
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
};

export const startDeletingUser = (uid) => {
  return async (dispatch) => {
    try {
      // Eliminar un usuario por su UID
      await axios.delete(`${USER_API_URL}/delete`, {
        data: { uid },
      });
      dispatch(setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid))); // Elimina al usuario del estado
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };
};

// export const checkAuthStateChanged = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(`${USER_API_URL}/current`);

//       const { user } = response.data;

//       if (!user) {
//         return dispatch(logout());
//       }

//       const { displayName, email, uid, photoURL } = user;

//       dispatch(login({ displayName, email, uid, photoURL }));
//       dispatch(startLoadingNotes());
//     } catch (error) {
//       console.error("Error al verificar el estado de autenticación:", error);
//       dispatch(logout());
//     }
//   };
// };