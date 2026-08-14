import prisma from '../config/prisma.js';
import { HTTP_STATUS } from '../utils/constants.js';

/**
 * @route   GET /api/resources
 * @desc    Get agricultural resources (public)
 * @access  Public
 */
export const getAllResources = async (req, res) => {
  try {
    const {
      category,
      status = 'published',
      search,
      page = 1,
      limit = 50
    } = req.query;

    const where = {
      status,
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const [resources, total] = await Promise.all([
      prisma.agriculturalResource.findMany({
        where,
        skip,
        take,
        orderBy: [
          { sortOrder: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.agriculturalResource.count({ where })
    ]);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        resources,
        pagination: {
          total,
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          totalPages: Math.ceil(total / parseInt(limit, 10))
        }
      }
    });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch resources',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/resources/:id
 * @desc    Get a single resource by ID
 * @access  Public
 */
export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await prisma.agriculturalResource.findUnique({
      where: { id }
    });

    if (!resource) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { resource }
    });
  } catch (error) {
    console.error('Get resource error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch resource',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/resources
 * @desc    Create an agricultural resource
 * @access  Private (Super Admin)
 */
export const createResource = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      fees,
      duration,
      imageUrl,
      status = 'published',
      sortOrder = 0
    } = req.body;

    if (!title || !category || !description) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Title, category and description are required'
      });
    }

    const resource = await prisma.agriculturalResource.create({
      data: {
        title,
        category,
        description,
        fees,
        duration,
        imageUrl,
        status,
        sortOrder: Number.isNaN(parseInt(sortOrder, 10)) ? 0 : parseInt(sortOrder, 10),
        createdById: req.user.id
      }
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Resource created successfully',
      data: { resource }
    });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create resource',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/resources/:id
 * @desc    Update an agricultural resource
 * @access  Private (Super Admin)
 */
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const existingResource = await prisma.agriculturalResource.findUnique({
      where: { id }
    });

    if (!existingResource) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Resource not found'
      });
    }

    if (updateData.sortOrder !== undefined) {
      const parsedSortOrder = parseInt(updateData.sortOrder, 10);
      updateData.sortOrder = Number.isNaN(parsedSortOrder) ? 0 : parsedSortOrder;
    }

    const resource = await prisma.agriculturalResource.update({
      where: { id },
      data: updateData
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Resource updated successfully',
      data: { resource }
    });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update resource',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/resources/:id
 * @desc    Delete an agricultural resource
 * @access  Private (Super Admin)
 */
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const existingResource = await prisma.agriculturalResource.findUnique({
      where: { id }
    });

    if (!existingResource) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Resource not found'
      });
    }

    await prisma.agriculturalResource.delete({
      where: { id }
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete resource',
      error: error.message
    });
  }
};
