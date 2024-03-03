// const express = require('express')
// const router = express.Router()
// const UserController = require("../controllers/UserController")
import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.post('/register',UserController.createUser);
router.post('/login', UserController.login);
router.get('/user-info',authMiddleware, UserController.getUserInfoByAccessToken);
router.get('/analytic/:userId', UserController.getUserAnalysticNumber);
router.patch('/user-basic-update',authMiddleware, UserController.updateUserBasicInfo);
router.get('/public-user-info/:userId', UserController.getUserInfoById)

export default router