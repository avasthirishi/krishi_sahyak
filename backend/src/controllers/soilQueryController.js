import prisma from '../config/prisma.js';
import { HTTP_STATUS } from '../utils/constants.js';

const VALID_QUERY_TYPES = new Set([
  'crop_recommendation',
  'fertilizer_suggestion',
  'pest_disease_medicine',
  'irrigation_advice',
  'general_query'
]);

/**
 * @route   POST /api/soil-queries
 * @desc    Submit a soil testing / researcher suggestion query
 * @access  Public
 */
export const createSoilQuery = async (req, res) => {
  try {
    const { name, email, phone, landSize, soilType, currentCrops, queryType, problemDescription } = req.body;

    if (!name || !email || !phone || !soilType || !queryType || !problemDescription) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'name, email, phone, soilType, queryType, and problemDescription are required'
      });
    }

    if (!VALID_QUERY_TYPES.has(queryType)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid queryType value'
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Phone must be a 10-digit number'
      });
    }

    const soilQuery = await prisma.soilQuery.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone,
        landSize: landSize ? parseFloat(landSize) : null,
        soilType: soilType.trim(),
        currentCrops: currentCrops?.trim() || null,
        queryType,
        problemDescription: problemDescription.trim()
      }
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Query submitted successfully! Our researchers will contact you soon.',
      data: { id: soilQuery.id }
    });
  } catch (error) {
    console.error('Create soil query error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to submit query'
    });
  }
};

/**
 * @route   GET /api/soil-queries
 * @desc    Get all soil queries (admin only)
 * @access  Private (SUPER_ADMIN)
 */
export const getAllSoilQueries = async (req, res) => {
  try {
    const { status, queryType, page = 1, limit = 50 } = req.query;

    const where = {
      ...(status && { status }),
      ...(queryType && { queryType })
    };

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const [queries, total] = await Promise.all([
      prisma.soilQuery.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.soilQuery.count({ where })
    ]);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        queries,
        pagination: { total, page: parseInt(page, 10), limit: take, totalPages: Math.ceil(total / take) }
      }
    });
  } catch (error) {
    console.error('Get soil queries error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to fetch queries' });
  }
};
