import express from 'express';
import { register, login, getMe, updateLanguage, mockSocialLogin } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/social-login-mock', mockSocialLogin);
router.get('/me', authenticate, getMe);
router.patch('/language', authenticate, updateLanguage);

export default router;
