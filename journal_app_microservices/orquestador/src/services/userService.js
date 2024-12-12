const axios = require('axios');
const AUTH_API_URL = process.env.USER_API_URL || 'http://user-service/user';
const { getAllUsers } = require("../providers");

const fetchAllUsers = async () => {
  try {
    console.log("Llamando al endpoint:", `${AUTH_API_URL}/all`);
    const response = await axios.get(`${AUTH_API_URL}/all`);
    console.log("Usuarios obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    throw new Error(error.response?.data?.message || "Error al obtener los usuarios");
  }
};




const userRegister = async (user) => {
  const { data } = await axios.post(`${AUTH_API_URL}/register`, user);
  return data;
};


module.exports = { userRegister, fetchAllUsers };


