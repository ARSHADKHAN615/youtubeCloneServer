import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import verifyToke from '../middlewares/authHandler.js';
const router = Router();

//User Routes
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/google', AuthController.googleSignIn);
router.get('/authUser', verifyToke, AuthController.getAuthUser);

export default router;