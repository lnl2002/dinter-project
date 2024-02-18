// const express = require('express')
// const router = express.Router()
// const UserController = require("../controllers/UserController")
import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';



router.post('/register',UserController.createUser)
router.post('/login', UserController.login)
router.get('/user-info', UserController.getUserInfoByAccessToken);

export default router