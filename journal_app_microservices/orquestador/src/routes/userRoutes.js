const express = require('express');
const { user, startGoogleSignIt } = require('../controllers/userController');

const router = express.Router();

router.post('/google-signin', startGoogleSignIt);
router.post('/register', user);

module.exports = router;