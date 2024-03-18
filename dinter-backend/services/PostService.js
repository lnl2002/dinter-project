import { notificationController } from "../controllers/index.js";
import Post from "../models/Post.js";
import User from "../models/User.js";


const createNewPost = async ({ author, content, images }) => {
    try {
        const newPost = await Post.create({ author, content, images });
        const post = await Post.findOne({ _id: newPost._id })
            .populate('author', 'username avatar')
            .populate('likes', 'username avatar')
            .exec();
        return post;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const getPost = async (userId, limit, offset) => {
    try {
        const friends = await User.findOne({ _id: userId }).exec();
        console.log(friends);
        console.log('vaoday');
        const getPosts = await Post.find({ $or: [{ author: { $in: friends.friends } }, { author: userId }] })
            .sort([['createdAt', -1]])
            .skip(Number(offset))
            .limit(Number(limit))
            .populate('author', 'username avatar')
            .populate('likes', 'username avatar')
            .exec();
        console.log('duoiday');
        console.log(getPosts);
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
        const getPosts = await Post.find({ author: userId })
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
        const favoritePost = await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: userId } }, { new: true })
            .populate('author', 'username avatar')
            .populate('likes', 'username avatar').exec();

        return favoritePost;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const handleDislike = async (postId, userId) => {
    try {
        console.log("disslike");
        const favoritePost = await Post.findOneAndUpdate({ _id: postId }, { $pull: { likes: userId } }, { new: true })
            .populate('author', 'username avatar')
            .populate('likes', 'username avatar').exec();
        return favoritePost;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const getPostById = async (postId) => {
    try {
        const post = Post.findById(postId)
        return post;
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
    handleDislike,
    getPostById,
}