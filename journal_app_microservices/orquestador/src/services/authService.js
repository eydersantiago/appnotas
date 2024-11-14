const axios = require('axios');
const AUTH_API_URL = process.env.AUTH_API_URL || 'http://localhost:30673/auth'; // Usa el nombre de servicio de Docker Compose

const login = async (credentials) => {
  const { data } = await axios.post(`${AUTH_API_URL}/login`, credentials);
  return data;
};

const checkAuthState = async () => {
  const { data } = await axios.post(`${AUTH_API_URL}/check-auth-state`);
  return data;
};

// Servicio para cerrar sesión
const logout = async () => {
  const { data } = await axios.post(`${AUTH_API_URL}/logout`);
  return data;
};

module.exports = { login, checkAuthState, logout };

