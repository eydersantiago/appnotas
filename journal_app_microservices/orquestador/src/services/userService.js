const axios = require('axios');
const AUTH_API_URL = process.env.USER_API_URL || 'http://user-service/user';

const userRegister = async (user) => {
  const { data } = await axios.post(`${AUTH_API_URL}/register`, user);
  return data;
};


module.exports = { userRegister };


