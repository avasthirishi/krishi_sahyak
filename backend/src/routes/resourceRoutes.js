import express from 'express';
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
} from '../controllers/resourceController.js';
import { authenticate, isSuperAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllResources);
router.get('/:id', getResourceById);

// Super admin only
router.post('/', authenticate, isSuperAdmin, createResource);
router.put('/:id', authenticate, isSuperAdmin, updateResource);
router.delete('/:id', authenticate, isSuperAdmin, deleteResource);

export default router;
