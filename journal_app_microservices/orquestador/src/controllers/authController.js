const { login } = require('../services/authService'); // Importa la función correcta

const loginController = async (req, res, next) => {
  try {
    // Llama al servicio de autenticación
    const response = await login(req.body);
    res.status(200).json(response); // Devuelve la respuesta al cliente
  } catch (error) {
    next(error); // Maneja errores mediante middleware de error
  }
};

module.exports = { login: loginController };
