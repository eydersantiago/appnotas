const { userRegister } = require('../services/userService'); // Importa la función correcta

const userController = async (req, res, next) => {
  try {
    
    const response = await userRegister(req.body);
    res.status(200).json(response); // Devuelve la respuesta al cliente
  } catch (error) {
    next(error); // Maneja errores mediante middleware de error
  }
};

module.exports = { user: userController };
