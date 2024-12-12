const express = require('express');
const { user, startGoogleSignIt } = require('../controllers/userController');
const { getAllUsersController, getCurrentlyUser } = require('../../../user/userController');

const router = express.Router();

router.post('/google-signin', startGoogleSignIt);
router.post('/register', user);
router.get('/all', getAllUsersController); 
router.get('/current', getCurrentlyUser);

module.exports = router;