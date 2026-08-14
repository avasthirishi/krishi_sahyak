// Crop Management Controller
import prisma from '../config/prisma.js';
import { HTTP_STATUS } from '../utils/constants.js';

/**
 * @route   GET /api/crops
 * @desc    Get all crops with filters and pagination
 * @access  Public
 */
export const getAllCrops = async (req, res) => {
  try {
    const { 
      category, 
      status = 'published', 
      search, 
      page = 1, 
      limit = 12,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const validSortFields = [
      'name',
      'category',
      'createdAt',
      'updatedAt',
      'views'
    ];
    const safeSortBy = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const safeOrder = ['asc', 'desc'].includes(order) ? order : 'desc';
    const parsedPage = Number.parseInt(page, 10);
    const parsedLimit = Number.parseInt(limit, 10);
    const safePage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
    const safeLimit = Number.isNaN(parsedLimit) || parsedLimit < 1 ? 12 : parsedLimit;

    // Build where clause
    const where = {
      status,
      ...(category && { category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { scientificName: { contains: search, mode: 'insensitive' } },
          { briefDescription: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    // Calculate pagination
    const skip = (safePage - 1) * safeLimit;
    const take = safeLimit;

    // Get crops
    const [crops, total] = await Promise.all([
      prisma.crop.findMany({
        where,
        skip,
        take,
        orderBy: { [safeSortBy]: safeOrder },
        include: {
          createdBy: {
            select: {
              id: true,
              email: true,
              profile: {
                select: { fullName: true }
              }
            }
          }
        }
      }),
      prisma.crop.count({ where })
    ]);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        crops,
        pagination: {
          total,
          page: safePage,
          limit: safeLimit,
          totalPages: Math.ceil(total / safeLimit)
        }
      }
    });
  } catch (error) {
    console.error('Get crops error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch crops',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/crops/:id
 * @desc    Get single crop by ID
 * @access  Public
 */
export const getCropById = async (req, res) => {
  try {
    const { id } = req.params;

    const crop = await prisma.crop.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            profile: {
              select: { fullName: true }
            }
          }
        }
      }
    });

    if (!crop) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Crop not found'
      });
    }

    // Increment view count
    await prisma.crop.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { crop }
    });
  } catch (error) {
    console.error('Get crop error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch crop',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/crops
 * @desc    Create new crop
 * @access  Private (Content Manager, Super Admin)
 */
export const createCrop = async (req, res) => {
  try {
    const {
      name,
      scientificName,
      briefDescription,
      fullDescription,
      imageUrl,
      climate,
      soil,
      sowingTime,
      harvestingTime,
      waterRequirements,
      commonPests,
      commonDiseases,
      yield: cropYield,
      cultivationPractices,
      fertilizerManagement,
      marketInfo,
      category,
      status = 'published'
    } = req.body;

    // Validation
    if (!name || !briefDescription || !category) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Name, brief description, and category are required'
      });
    }

    const crop = await prisma.crop.create({
      data: {
        name,
        scientificName,
        briefDescription,
        fullDescription,
        imageUrl,
        climate,
        soil,
        sowingTime,
        harvestingTime,
        waterRequirements,
        commonPests: commonPests || [],
        commonDiseases: commonDiseases || [],
        yield: cropYield,
        cultivationPractices: cultivationPractices || [],
        fertilizerManagement,
        marketInfo,
        category,
        status,
        createdById: req.user.id
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            profile: {
              select: { fullName: true }
            }
          }
        }
      }
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Crop created successfully',
      data: { crop }
    });
  } catch (error) {
    console.error('Create crop error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create crop',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/crops/:id
 * @desc    Update crop
 * @access  Private (Content Manager, Super Admin)
 */
export const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if crop exists
    const existingCrop = await prisma.crop.findUnique({
      where: { id }
    });

    if (!existingCrop) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Crop not found'
      });
    }

    // Update crop
    const crop = await prisma.crop.update({
      where: { id },
      data: updateData,
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            profile: {
              select: { fullName: true }
            }
          }
        }
      }
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Crop updated successfully',
      data: { crop }
    });
  } catch (error) {
    console.error('Update crop error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update crop',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/crops/:id
 * @desc    Delete crop
 * @access  Private (Super Admin)
 */
export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if crop exists
    const existingCrop = await prisma.crop.findUnique({
      where: { id }
    });

    if (!existingCrop) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Crop not found'
      });
    }

    // Delete crop
    await prisma.crop.delete({
      where: { id }
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Crop deleted successfully'
    });
  } catch (error) {
    console.error('Delete crop error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete crop',
      error: error.message
    });
  }
};
