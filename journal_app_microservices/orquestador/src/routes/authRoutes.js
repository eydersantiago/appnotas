const express = require('express');
const { login , checkAuthState, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/check-auth-state', checkAuthState);
router.post('/logout', logout);

module.exports = router;