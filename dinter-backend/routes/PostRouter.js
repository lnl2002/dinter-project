import express from 'express';
const router = express.Router();
import {postController} from '../controllers/index.js';

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/images/posts/')
    },
    filename: function(req, file, cb) {
        cb(null, req.body.author + Date.now() + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})


router.post('/', upload.array("images", 10), postController.createPost)
.get('/', postController.getPosts)
.delete('/:id', postController.deletePost)
router.get('/all-from/:userId', postController.getPostsByUserId)

export default router