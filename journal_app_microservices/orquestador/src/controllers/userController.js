const { userRegister } = require('../services/userService');

const userController = async (req, res, next) => {
  try {

    const response = await userRegister(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const startGoogleSignIt = async (req, res) => {
  res.status(200).json({
    ok: false
  });

};

module.exports = { user: userController, startGoogleSignIt };
