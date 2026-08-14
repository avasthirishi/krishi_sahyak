import express from 'express';
import { authenticate, isSuperAdmin } from '../middlewares/auth.js';
import {
  getPendingUsers, approveUser, rejectUser, getAllUsers,
  createResearchPaper, getResearchPapers, deleteResearchPaper,
  createNotice, getNotices, deleteNotice,
  createEvent, getEvents, deleteEvent,
  createWeatherAlert, getWeatherAlerts, deleteWeatherAlert,
  createMandiEntry, getMandiEntries, deleteMandiEntry
} from '../controllers/adminController.js';

const router = express.Router();

// ── User Management ───────────────────────────────────────────────────────────
router.get('/users', authenticate, isSuperAdmin, getAllUsers);
router.get('/users/pending', authenticate, isSuperAdmin, getPendingUsers);
router.patch('/users/:id/approve', authenticate, isSuperAdmin, approveUser);
router.patch('/users/:id/reject', authenticate, isSuperAdmin, rejectUser);

// ── Research Papers ───────────────────────────────────────────────────────────
router.get('/research', getResearchPapers);
router.post('/research', authenticate, isSuperAdmin, createResearchPaper);
router.delete('/research/:id', authenticate, isSuperAdmin, deleteResearchPaper);

// ── Notices ───────────────────────────────────────────────────────────────────
router.get('/notices', getNotices);
router.post('/notices', authenticate, isSuperAdmin, createNotice);
router.delete('/notices/:id', authenticate, isSuperAdmin, deleteNotice);

// ── Government Events ─────────────────────────────────────────────────────────
router.get('/events', getEvents);
router.post('/events', authenticate, isSuperAdmin, createEvent);
router.delete('/events/:id', authenticate, isSuperAdmin, deleteEvent);

// ── Weather Alerts ────────────────────────────────────────────────────────────
router.get('/weather-alerts', getWeatherAlerts);
router.post('/weather-alerts', authenticate, isSuperAdmin, createWeatherAlert);
router.delete('/weather-alerts/:id', authenticate, isSuperAdmin, deleteWeatherAlert);

// ── Mandi Entries ─────────────────────────────────────────────────────────────
router.get('/mandi', getMandiEntries);
router.post('/mandi', authenticate, isSuperAdmin, createMandiEntry);
router.delete('/mandi/:id', authenticate, isSuperAdmin, deleteMandiEntry);

export default router;
