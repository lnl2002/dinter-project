// const express = require('express')
// const router = express.Router()
// const UserController = require("../controllers/UserController")
import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import multer from 'multer';

// Configure multer storage and file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users/'); // Specify the destination folder
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()); // Specify the file name
    }
  });
  
const fileFilter = (req, file, cb) => {
// Accept only image files
if (file.mimetype.startsWith('image/')) {
    cb(null, true);
} else {
    cb(new Error('Please upload only images'), false);
}
};

// Create an upload instance
const upload = multer({storage, fileFilter});

router.post('/register',UserController.createUser);
router.post('/login', UserController.login);
router.get('/user-info',authMiddleware, UserController.getUserInfoByAccessToken);
router.get('/analytic/:userId', UserController.getUserAnalysticNumber);
router.patch('/user-basic-update', authMiddleware, upload.single('image'), UserController.updateUserBasicInfo);
router.get('/public-user-info/:userId', UserController.getUserInfoById)

export default router