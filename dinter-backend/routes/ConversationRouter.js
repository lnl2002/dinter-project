import express from 'express';
const router = express.Router();
import ConversationController from '../controllers/ConversationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


router.post('/create-chat',authMiddleware, ConversationController.createChat);
router.get('/find-user-chats/:userId',authMiddleware, ConversationController.findUserChats);
router.get('/find-chat/:firstId/:secondId',authMiddleware, ConversationController.findChat);
router.post('/update-read', authMiddleware, ConversationController.updateRead);

//prm dinter lite api
router.get('/find-user-chats-prm/:userId', ConversationController.findUserChats);
router.get('/find-chat-prm/:firstId/:secondId', ConversationController.findChat);

export default router;