import express from 'express';
import { createSoilQuery, getAllSoilQueries } from '../controllers/soilQueryController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', createSoilQuery);
router.get('/', authenticate, authorize('SUPER_ADMIN'), getAllSoilQueries);

export default router;
