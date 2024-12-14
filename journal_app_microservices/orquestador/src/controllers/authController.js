const { login, checkAuthState, logout } = require('../services/authService');

const loginController = async (req, res, next) => {
  try {
    const response = await login(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkAuthStateController = async (req, res, next) => {
  try {
    const response = await checkAuthState();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ error: "El usuario no se ha autenticado" });
  }
};

const logoutController = async (req, res, next) => {
  try {
    const response = await logout();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "Error al cerrar sesión" });
  }
};

module.exports = { 
  login: loginController, 
  checkAuthState: checkAuthStateController, 
  logout: logoutController 
};