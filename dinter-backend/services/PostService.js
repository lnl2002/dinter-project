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
        const getPosts = await Post.find({}).sort([['createdAt', -1]]).skip(Number(offset)).limit(Number(limit)).populate('author', 'username').exec();
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
export default{
    createNewPost,
    getPost,
    deletePost
}