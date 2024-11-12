const axios = require('axios');
const AUTH_API_URL = process.env.AUTH_API_URL || 'http://auth:4000/auth'; // Usa el nombre de servicio de Docker Compose

const login = async (credentials) => {
  const { data } = await axios.post(`${AUTH_API_URL}/login`, credentials);
  return data;
};

module.exports = { login };


