import express from 'express';
// import { 
//     startGoogleSignIt,
//     creatingUserWithEmailPassword,
// } from '../userController.js';
//const { creatingUserWithEmailPassword, startGoogleSignIt, getAllUsersController, getCurrentlyUser } = require('../userController.js');
import { creatingUserWithEmailPassword, startGoogleSignIt, getAllUsersController, getCurrentlyUser } from '../userController.js';


const router = express.Router();

router.post('/google-signin', startGoogleSignIt);
router.post('/register', creatingUserWithEmailPassword);
router.get('/all', getAllUsersController); 
router.get('/current', getCurrentlyUser)

export default router;
