import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { getPosts, getPostById, createPost, deletePost, likePost, addComment, deleteComment } from '../controllers/communityController.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authenticate, createPost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, likePost);
router.post('/:id/comments', authenticate, addComment);
router.delete('/:id/comments/:commentId', authenticate, deleteComment);

export default router;
