const express = require('express');
const MessageController = require('../controllers/messageController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-message', authMiddleware, MessageController.createMessage);
router.get('/get-messages/:conversationId', authMiddleware, MessageController.getMessages);

module.exports = router;