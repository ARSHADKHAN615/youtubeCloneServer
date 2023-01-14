const express = require('express');
const AuthController = require('../controllers/AuthController.js');
const verifyToke = require('../middlewares/authHandler.js');
const router = express.Router();

//User Routes
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/google', AuthController.googleSignIn);
router.get('/authUser', verifyToke, AuthController.getAuthUser);
router.get('/usernameExist/:username', AuthController.usernameExist);
router.get('/emailExist/:email', AuthController.emailExist);
router.get('/logout', AuthController.logout);
module.exports = router;