const express = require('express')
const router = express.Router()
const UserController = require("../controllers/UserController")
const { authMiddleware } = require('../middleware/authMiddleware')


router.post('/register',UserController.createUser)
router.post('/login', UserController.login)


module.exports = router