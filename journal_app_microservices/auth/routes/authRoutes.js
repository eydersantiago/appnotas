import express from 'express';
import { 
    authenticateUserWithEmailPassword,
    creatingUserWithEmailPassword,
    //getGoogleAuthProvider,
    getAuthenticatedUser,
    //startGoogleSignIt,
    logout,
} from '../authController.js';

const router = express.Router();

router.post('/login', authenticateUserWithEmailPassword );
// router.post('/register', creatingUserWithEmailPassword);
router.post('/check-auth-state', getAuthenticatedUser);
router.post('/logout', logout);

export default router;
