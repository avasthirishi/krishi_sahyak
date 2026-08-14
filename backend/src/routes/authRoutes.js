// Authentication Routes
import express from 'express';
import { 
  sendRegistrationOtp,
  verifyRegistrationOtp,
  sendLoginOtp,
  verifyLoginOtp,
  register, 
  login, 
  refreshToken, 
  getMe, 
  updateProfile 
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/send-registration-otp', sendRegistrationOtp);
router.post('/verify-registration-otp', verifyRegistrationOtp);
router.post('/send-login-otp', sendLoginOtp);
router.post('/verify-login-otp', verifyLoginOtp);
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);

export default router;
