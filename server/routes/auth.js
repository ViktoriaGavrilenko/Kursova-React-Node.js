import express from 'express';
import {loginValidation, registerValidation} from "../validations.js";
import * as UserController from "../controllers/UserController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

const router = express.Router();

router.post('/login', loginValidation, handleValidationErrors, UserController.login);
router.post('/register', registerValidation, handleValidationErrors, UserController.register);
router.get('/me', checkAuth, UserController.getMe);

export default router;