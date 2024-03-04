import { notificationController } from "../controllers/index.js";
import Post from "../models/Post.js";


const createNewPost = async ({ author, content, images }) => {
    try {
        const newPost = await Post.create({ author, content, images });
        return newPost._doc;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const getPost = async (limit, offset) => {
    try {
        const getPosts = await Post.find({})
        .sort([['createdAt', -1]])
        .skip(Number(offset))
        .limit(Number(limit))
        .populate('author', 'username')
        .exec();
        return getPosts;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const deletePost = async (id) => {
    try {
        const post = await Post.findById(id).exec();
        const deletePost = await Post.deleteOne({ _id: id });
        return post.images;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const getPostsByUserId = async (limit, offset, userId) => {
    try {
        const getPosts = await Post.find({author: userId})
        .sort([['createdAt', -1]])
        .skip(Number(offset))
        .limit(Number(limit))
        .populate('author', 'username')
        .populate({
            path: 'comments.userId',
            select: 'username',
        })
        .exec();
        return getPosts;
    } catch (error) {
        throw new Error(error.toString());
    }
}


const editPost = async (id, content) => {
    try {
        await Post.updateOne({ _id: id }, { $set: { content: content } });
        const post1 = await Post.findById(id).populate('author', 'username').exec();
        return post1;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const handleLike = async (postId, userId) => {
    try {
        console.log(postId);
        const favorited = await Post.findOne({ _id: postId }).exec();
        console.log(favorited);
        if (favorited.likes.includes(userId)) {
            throw new Error("The user liked this post!")
        }
        const favoritePost = await Post.updateOne({ _id: postId }, { $push: { likes: userId } })
        const notification = await notificationController.insertNotification({
            receiver: favorited.author,
            type: 'like',
            sender: userId,
            link: '/login'
        })
        return notification;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const handleDislike = async (postId, userId) => {
    try {
        console.log("disslike");
        const favoritePost = await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
        return favoritePost;
    } catch (error) {
        throw new Error(error.toString())
    }
}
export default {
    createNewPost,
    getPost,
    deletePost,
    getPostsByUserId,
    editPost,
    handleLike,
    handleDislike
}