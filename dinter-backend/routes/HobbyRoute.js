import express from 'express';
import HobbyController  from '../controllers/HobbyController.js';
const router = express.Router();

//gets
router.get('/:keyWord', HobbyController.getAllHobbyByKeyWord)
router.get('/', HobbyController.getAllHobby)

export default router;