import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middleware/authMiddleware.js';
import CommentController from '../controllers/CommentController.js';

router.post('/post-comment',authMiddleware, CommentController.createComment);

export default router;