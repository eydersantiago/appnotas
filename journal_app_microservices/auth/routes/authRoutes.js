import express from 'express';
import { 
    authenticateUserWithEmailPassword,
    getAuthenticatedUser,
    logout,
} from '../authController.js';

const router = express.Router();

router.post('/login', authenticateUserWithEmailPassword );
router.post('/check-auth-state', getAuthenticatedUser);
router.post('/logout', logout);

export default router;
