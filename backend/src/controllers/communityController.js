import prisma from '../config/prisma.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const getPosts = async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const where = {
      status: 'active',
      ...(category && category !== 'all' && { category })
    };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
        where, skip, take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, role: true, profile: { select: { fullName: true, avatarUrl: true } } } },
          _count: { select: { comments: true } }
        }
      }),
      prisma.communityPost.count({ where })
    ]);
    res.json({ success: true, data: { posts, pagination: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) } } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await prisma.communityPost.findUnique({
      where: { id: req.params.id },
      include: {
        author: { select: { id: true, role: true, profile: { select: { fullName: true, avatarUrl: true } } } },
        comments: {
          include: { author: { select: { id: true, role: true, profile: { select: { fullName: true, avatarUrl: true } } } } },
          orderBy: { createdAt: 'asc' }
        }
      }
    });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: { post } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, imageUrl } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content is required' });
    const post = await prisma.communityPost.create({
      data: { authorId: req.user.id, title, content, category: category || 'general', tags: tags || [], imageUrl },
      include: { author: { select: { id: true, role: true, profile: { select: { fullName: true, avatarUrl: true } } } } }
    });
    res.status(201).json({ success: true, data: { post } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await prisma.communityPost.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    if (post.authorId !== req.user.id && req.user.role !== 'SUPER_ADMIN')
      return res.status(403).json({ success: false, message: 'Not authorized' });
    await prisma.communityPost.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Post deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await prisma.communityPost.update({
      where: { id: req.params.id },
      data: { likesCount: { increment: 1 } }
    });
    res.json({ success: true, data: { likesCount: post.likesCount } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content required' });
    const comment = await prisma.communityComment.create({
      data: { postId: req.params.id, authorId: req.user.id, content },
      include: { author: { select: { id: true, role: true, profile: { select: { fullName: true, avatarUrl: true } } } } }
    });
    res.status(201).json({ success: true, data: { comment } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await prisma.communityComment.findUnique({ where: { id: req.params.commentId } });
    if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
    if (comment.authorId !== req.user.id && req.user.role !== 'SUPER_ADMIN')
      return res.status(403).json({ success: false, message: 'Not authorized' });
    await prisma.communityComment.delete({ where: { id: req.params.commentId } });
    res.json({ success: true, message: 'Comment deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
