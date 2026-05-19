import { Router } from 'express';
import { validateLogin, validateRegister } from '../middleware/validate.auth.js';
import { getMe, login, register } from '../controller/auth.controller.js';
import { validateUser } from '../middleware/validate.user.js';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me',validateUser, getMe);

export default router;