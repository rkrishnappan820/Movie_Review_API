import { signUpHandler, loginHandler } from '../controllers/authController.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { validateCredentials } from '../middleware/validateUser.js';
import express from 'express';

const authRouter = express.Router();
authRouter.post('/signUp', validateCredentials, signUpHandler);
authRouter.post('/login', loginLimiter, validateCredentials, loginHandler);

export default authRouter;
