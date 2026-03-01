import express from 'express';
import { loginUserValidator, registerUserValidator } from '../validators/user.validators.js';
import { validateMiddleware } from '../middlewares/validate.middlewares.js';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controllers.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const authRouter = express.Router();

authRouter.route('/register').post(registerUserValidator, validateMiddleware, registerUser);
authRouter.route('/login').post(loginUserValidator, validateMiddleware, loginUser);
authRouter.route('/logout').post(verifyJWT, logoutUser);

export { authRouter };
