import { postService } from "../services/index.js";
import fs from 'fs'
const createPost = async (req, res) => {
    try {
        const author = req.body.author;
        let images = [];
        if (req.files) {
            req.files.forEach((file) => {
                images.push(file.path);
            })
        }
        console.log(images);
        const content = req.body.content;
        const newPost = await postService.createNewPost({ author, content, images });
        res.status(200).json({
            post: newPost
        })
    } catch (e) {
        res.status(500).json({
            messages: e.toString()
        })
    }
}

const getPosts = async (req, res) => {
    try {

        console.log('nhay va day');
        const limit = req.query.limit || 3;
        const offset = req.query.offset || 0;

        const post = await postService.getPost(limit, offset);
        res.status(200).json({
            message: "get posts success",
            data: post
        })
    }
    catch (error) {
        res.status(500).json({
            messages: error.toString()
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const images = await postService.deletePost(req.params.id);
        if (images) {
            images.forEach((image) => {
                fs.unlinkSync(`./${image}`)
            })
        }
        res.status(200).json({
            messages:"Delete post sucessfully!"
        });
    } catch (error) {
        res.status(500).json({
            messages: error.toString()
        })
    }
}
export default {
    createPost,
    getPosts,
    deletePost
}
