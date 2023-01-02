import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
const router = Router();

//User Routes
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
// router.post('/google', AuthController.addUser);

export default router;