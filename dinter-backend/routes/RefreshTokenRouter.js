const express = require('express')
const router = express.Router()
const UserController = require("../controllers/UserController")


router.get('/refresh-token', UserController.refreshToken)

module.exports = router