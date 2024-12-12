import {
  getAllUsers,
  getCurrentUser,
  registerUserWithEmailPassword,
  signInWithGoogle
} from "./firebase/providers.js";
//const { fetchAllUsers } = require('../services/userService');

export const startGoogleSignIt = async (req, res) => {
  res.status(200).json({
    ok: false
  });

};

export const creatingUserWithEmailPassword = async (req, res) => {

  const { email, password, displayName } = req.body;

  try {
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({ displayName, email, password });
    res.status(200).json({ ok, displayName, photoURL, uid, errorMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCurrentlyUser = async (req, res) => {
  try {
      // Extrae información del usuario autenticado desde el token o sesión
      const user = await getCurrentUser(); // Ejemplo
      res.status(200).json({ user });
  } catch (error) {
      res.status(500).json({ error: "Error fetching current user" });
  }
};

// export const getAllUsersController = async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


export const getAllUsersController = async (req, res) => {
  try {
      const users = [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];
      res.status(200).json({ ok: true, users });
  } catch (error) {
      console.error('Error al obtener usuarios:', error.message);
      res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


// module.exports = { 
//   user: userController, 
//   startGoogleSignIt,
//   getAllUsersController, 
//   getCurrentlyUser
// };