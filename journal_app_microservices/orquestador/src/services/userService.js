const axios = require('axios');
const AUTH_API_URL = process.env.USER_API_URL || 'http://localhost:30688/user'; // Usa el nombre de servicio de Docker Compose

const userRegister = async (user) => {
  const { data } = await axios.post(`${AUTH_API_URL}/register`, user);
  return data;
};


module.exports = { userRegister };


