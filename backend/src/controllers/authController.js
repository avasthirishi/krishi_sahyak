// Authentication Controller
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import { generateTokens, verifyRefreshToken } from '../utils/generateToken.js';
import { HTTP_STATUS, ROLES } from '../utils/constants.js';
import { sendOtpEmail } from '../utils/emailService.js';
import {
  canRequestOtp,
  saveOtp,
  getOtpRecord,
  incrementOtpAttempts,
  clearOtp,
  markEmailVerified,
  isEmailVerifiedForSignup,
  consumeEmailVerification,
  canRequestLoginOtp,
  saveLoginOtp,
  getLoginOtpRecord,
  incrementLoginOtpAttempts,
  clearLoginOtp,
  markLoginVerified,
  isLoginVerified,
  consumeLoginVerification
} from '../utils/otpStore.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

/**
 * @route   POST /api/auth/send-registration-otp
 * @desc    Send OTP for registration email verification
 * @access  Public
 */
export const sendRegistrationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Email is required'
      });
    }

    const normalizedEmail = email.toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const rateLimit = canRequestOtp(normalizedEmail);
    if (!rateLimit.allowed) {
      return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        success: false,
        message: `Please wait ${rateLimit.retryAfterSeconds} seconds before requesting another OTP`
      });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    saveOtp(normalizedEmail, otpHash);

    const emailResult = await sendOtpEmail(normalizedEmail, otp, 'email registration');
    const isDevelopment = process.env.NODE_ENV !== 'production';

    if (!emailResult.delivered) {
      console.warn(`[OTP register] Not delivered to ${normalizedEmail}. Reason: ${emailResult.reason}`);
    }

    const responsePayload = {
      success: true,
      message: emailResult.delivered
        ? 'OTP sent to your email address'
        : isDevelopment
          ? 'OTP generated for development. Use the OTP shown below.'
          : 'OTP generated, but email delivery is currently unavailable.',
      data: {
        otpSent: emailResult.delivered
      }
    };

    if (!emailResult.delivered && isDevelopment) {
      responsePayload.data.devOtp = otp;
    }

    return res.status(HTTP_STATUS.OK).json(responsePayload);
  } catch (error) {
    console.error('Send registration OTP error:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to send OTP. Please try again.',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/verify-registration-otp
 * @desc    Verify OTP for registration
 * @access  Public
 */
export const verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    const normalizedEmail = email.toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const record = getOtpRecord(normalizedEmail);

    if (!record) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'OTP has expired or was not requested. Please request a new OTP.'
      });
    }

    if (record.attempts >= 5) {
      clearOtp(normalizedEmail);
      return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        success: false,
        message: 'Too many invalid attempts. Please request a new OTP.'
      });
    }

    const isOtpValid = await bcrypt.compare(String(otp), record.otpHash);

    if (!isOtpValid) {
      incrementOtpAttempts(normalizedEmail);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    clearOtp(normalizedEmail);
    markEmailVerified(normalizedEmail);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Verify registration OTP error:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'OTP verification failed. Please try again.',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/send-login-otp
 * @desc    Send OTP to verify login (2FA step after password)
 * @access  Public
 */
export const sendLoginOtp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail }, include: { profile: true } });

    if (!user || !user.isActive) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Invalid email or password' });
    }

    const rateLimit = canRequestLoginOtp(normalizedEmail);
    if (!rateLimit.allowed) {
      return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        success: false,
        message: `Please wait ${rateLimit.retryAfterSeconds} seconds before requesting another OTP`
      });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    saveLoginOtp(normalizedEmail, otpHash);

    const emailResult = await sendOtpEmail(normalizedEmail, otp, 'login verification');
    const isDevelopment = process.env.NODE_ENV !== 'production';

    if (!emailResult.delivered) {
      console.warn(`[OTP login] Not delivered to ${normalizedEmail}. Reason: ${emailResult.reason}`);
    }

    const responsePayload = {
      success: true,
      message: emailResult.delivered
        ? 'OTP sent to your email. Enter it to complete login.'
        : isDevelopment
          ? 'OTP generated for development. Use the OTP shown below.'
          : 'OTP generated, but email delivery is currently unavailable.',
      data: { otpSent: emailResult.delivered }
    };

    if (!emailResult.delivered && isDevelopment) {
      responsePayload.data.devOtp = otp;
    }

    return res.status(HTTP_STATUS.OK).json(responsePayload);
  } catch (error) {
    console.error('Send login OTP error:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to send OTP. Please try again.',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/verify-login-otp
 * @desc    Verify login OTP and return tokens
 * @access  Public
 */
export const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Email and OTP are required' });
    }

    const normalizedEmail = email.toLowerCase();
    const record = getLoginOtpRecord(normalizedEmail);

    if (!record) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'OTP has expired or was not requested. Please start login again.'
      });
    }

    if (record.attempts >= 5) {
      clearLoginOtp(normalizedEmail);
      return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        success: false,
        message: 'Too many invalid attempts. Please start login again.'
      });
    }

    const isOtpValid = await bcrypt.compare(String(otp), record.otpHash);
    if (!isOtpValid) {
      incrementLoginOtpAttempts(normalizedEmail);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Invalid OTP' });
    }

    clearLoginOtp(normalizedEmail);

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail }, include: { profile: true } });
    if (!user || !user.isActive) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Account not found or deactivated.' });
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    await prisma.user.update({ where: { id: user.id }, data: { updatedAt: new Date() } });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Login successful',
      data: {
        user: { id: user.id, email: user.email, role: user.role, profile: user.profile },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Verify login OTP error:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'OTP verification failed. Please try again.',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { email, password, fullName, role, phone, city, state } = req.body;
    const normalizedEmail = email?.toLowerCase();

    // Validation
    if (!email || !password || !fullName) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Email, password, and full name are required'
      });
    }

    // Email format validation
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    if (!isEmailVerifiedForSignup(normalizedEmail)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Please verify your email with OTP before registration'
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Set default role
    const userRole = role && Object.values(ROLES).includes(role) ? role : ROLES.FARMER;

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        role: userRole,
        profile: {
          create: {
            fullName,
            phone: phone || null,
            city: city || null,
            state: state || null
          }
        }
      },
      include: {
        profile: true
      }
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);
    consumeEmailVerification(normalizedEmail);

    // Return success response
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          profile: user.profile
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true }
    });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() }
    });

    // Return success response
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          profile: user.profile
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Login failed. Please try again.',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token using refresh token
 * @access  Public
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || !user.isActive) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const tokens = generateTokens(user.id, user.email, user.role);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Token refreshed successfully',
      data: tokens
    });
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or expired refresh token',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        profile: true
      }
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
export const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, city, state, pincode, bio } = req.body;

    const updatedProfile = await prisma.profile.update({
      where: { userId: req.user.id },
      data: {
        fullName: fullName || undefined,
        phone: phone || undefined,
        city: city || undefined,
        state: state || undefined,
        pincode: pincode || undefined,
        bio: bio || undefined
      }
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Profile updated successfully',
      data: { profile: updatedProfile }
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};
