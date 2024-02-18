const express = require('express')
const router = express.Router()
const ConversationController = require("../controllers/ConversationController");
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/create-chat',authMiddleware, ConversationController.createChat);
router.get('/find-user-chats/:userId',authMiddleware, ConversationController.findUserChats);
router.get('/find-chat/:firstId/:secondId',authMiddleware, ConversationController.findChat);

module.exports = router