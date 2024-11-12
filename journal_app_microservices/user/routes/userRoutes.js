import express from 'express';
import { 
    startGoogleSignIt,
    creatingUserWithEmailPassword,
} from '../userController.js';

const router = express.Router();

router.post('/google-signin', startGoogleSignIt);
router.post('/register', creatingUserWithEmailPassword);

export default router;
