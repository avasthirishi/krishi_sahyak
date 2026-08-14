// Crop Routes
import express from 'express';
import { 
  getAllCrops, 
  getCropById, 
  createCrop, 
  updateCrop, 
  deleteCrop 
} from '../controllers/cropController.js';
import { authenticate, canManageContent, isSuperAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllCrops);
router.get('/:id', getCropById);

// Protected routes (Content Manager & Super Admin)
router.post('/', authenticate, canManageContent, createCrop);
router.put('/:id', authenticate, canManageContent, updateCrop);

// Super Admin only
router.delete('/:id', authenticate, isSuperAdmin, deleteCrop);

export default router;
