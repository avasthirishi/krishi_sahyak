import prisma from '../config/prisma.js';
import { HTTP_STATUS } from '../utils/constants.js';

// ── User Approval ─────────────────────────────────────────────────────────────

export const getPendingUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { isApproved: false, role: { not: 'SUPER_ADMIN' } },
      include: { profile: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: { users } });
  } catch (error) {
    console.error('getPendingUsers error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to fetch pending users' });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { isApproved: true },
      include: { profile: true }
    });
    res.json({ success: true, message: 'User approved successfully', data: { user } });
  } catch (error) {
    console.error('approveUser error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to approve user' });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.update({ where: { id }, data: { isActive: false } });
    res.json({ success: true, message: 'User rejected and deactivated' });
  } catch (error) {
    console.error('rejectUser error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to reject user' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { role, isApproved, page = 1, limit = 50 } = req.query;
    const where = {
      ...(role && { role }),
      ...(isApproved !== undefined && { isApproved: isApproved === 'true' })
    };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, include: { profile: true }, skip, take: parseInt(limit), orderBy: { createdAt: 'desc' } }),
      prisma.user.count({ where })
    ]);
    res.json({ success: true, data: { users, pagination: { total, page: parseInt(page), limit: parseInt(limit) } } });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to fetch users' });
  }
};

// ── Research Papers ───────────────────────────────────────────────────────────

export const createResearchPaper = async (req, res) => {
  try {
    const { title, abstract, authors, journal, publishedAt, pdfUrl, tags } = req.body;
    if (!title || !abstract || !authors) return res.status(400).json({ success: false, message: 'title, abstract, and authors are required' });
    const paper = await prisma.researchPaper.create({
      data: { title, abstract, authors, journal, publishedAt: publishedAt ? new Date(publishedAt) : null, pdfUrl, tags: tags || [], createdById: req.user.id }
    });
    res.status(201).json({ success: true, data: { paper } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getResearchPapers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [papers, total] = await Promise.all([
      prisma.researchPaper.findMany({ where: { status: 'published' }, skip, take: parseInt(limit), orderBy: { createdAt: 'desc' }, include: { createdBy: { select: { email: true, profile: { select: { fullName: true } } } } } }),
      prisma.researchPaper.count({ where: { status: 'published' } })
    ]);
    res.json({ success: true, data: { papers, pagination: { total, page: parseInt(page), limit: parseInt(limit) } } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteResearchPaper = async (req, res) => {
  try {
    await prisma.researchPaper.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ── Notices ───────────────────────────────────────────────────────────────────

export const createNotice = async (req, res) => {
  try {
    const { title, content, category, priority, expiresAt } = req.body;
    if (!title || !content) return res.status(400).json({ success: false, message: 'title and content required' });
    const notice = await prisma.notice.create({
      data: { title, content, category: category || 'general', priority: priority || 'normal', expiresAt: expiresAt ? new Date(expiresAt) : null, createdById: req.user.id }
    });
    res.status(201).json({ success: true, data: { notice } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await prisma.notice.findMany({
      where: { status: 'active', OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }] },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }]
    });
    res.json({ success: true, data: { notices } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    await prisma.notice.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ── Government Events ─────────────────────────────────────────────────────────

export const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, location, category, organizer, imageUrl, registrationUrl } = req.body;
    if (!title || !description || !eventDate) return res.status(400).json({ success: false, message: 'title, description, eventDate required' });
    const event = await prisma.governmentEvent.create({
      data: { title, description, eventDate: new Date(eventDate), location, category: category || 'general', organizer, imageUrl, registrationUrl, createdById: req.user.id }
    });
    res.status(201).json({ success: true, data: { event } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { status } = req.query;
    const events = await prisma.governmentEvent.findMany({
      where: status ? { status } : {},
      orderBy: { eventDate: 'asc' }
    });
    res.json({ success: true, data: { events } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await prisma.governmentEvent.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ── Weather Alerts ────────────────────────────────────────────────────────────

export const createWeatherAlert = async (req, res) => {
  try {
    const { title, message, severity, region, validFrom, validUntil } = req.body;
    if (!title || !message || !validFrom || !validUntil) return res.status(400).json({ success: false, message: 'title, message, validFrom, validUntil required' });
    const alert = await prisma.weatherAlert.create({
      data: { title, message, severity: severity || 'info', region, validFrom: new Date(validFrom), validUntil: new Date(validUntil), createdById: req.user.id }
    });
    res.status(201).json({ success: true, data: { alert } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getWeatherAlerts = async (req, res) => {
  try {
    const alerts = await prisma.weatherAlert.findMany({
      where: { validUntil: { gte: new Date() } },
      orderBy: { validFrom: 'asc' }
    });
    res.json({ success: true, data: { alerts } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteWeatherAlert = async (req, res) => {
  try {
    await prisma.weatherAlert.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ── Mandi Entries ─────────────────────────────────────────────────────────────

export const createMandiEntry = async (req, res) => {
  try {
    const { mandiName, state, district, commodity, variety, minPrice, maxPrice, modalPrice, unit, reportDate } = req.body;
    if (!mandiName || !state || !commodity || !minPrice || !maxPrice || !modalPrice || !reportDate)
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    const entry = await prisma.mandiEntry.create({
      data: { mandiName, state, district, commodity, variety, minPrice: parseFloat(minPrice), maxPrice: parseFloat(maxPrice), modalPrice: parseFloat(modalPrice), unit: unit || 'Quintal', reportDate: new Date(reportDate), createdById: req.user.id }
    });
    res.status(201).json({ success: true, data: { entry } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getMandiEntries = async (req, res) => {
  try {
    const { commodity, state, page = 1, limit = 50 } = req.query;
    const where = {
      ...(commodity && { commodity: { contains: commodity, mode: 'insensitive' } }),
      ...(state && { state: { contains: state, mode: 'insensitive' } })
    };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [entries, total] = await Promise.all([
      prisma.mandiEntry.findMany({ where, skip, take: parseInt(limit), orderBy: { reportDate: 'desc' } }),
      prisma.mandiEntry.count({ where })
    ]);
    res.json({ success: true, data: { entries, pagination: { total, page: parseInt(page), limit: parseInt(limit) } } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteMandiEntry = async (req, res) => {
  try {
    await prisma.mandiEntry.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
