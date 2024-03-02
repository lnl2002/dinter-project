import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Create a new comment
async function createComment(postId, userId, content) {
    try {
        const newComment = new Comment({
            postId,
            userId,
            content,
        });
        await newComment.save();

        const post = await Post.findById(postId);
        post.comments.unshift(newComment);
        await post.save();

        //console.log('Comment created successfully:', newComment);
        return newComment;
    } catch (error) {
        console.error('Error creating comment:', error);
    }
}

// Get comments for a specific post
async function getCommentsForPost(postId, limit, offset) {
    try {
        const comments = await Comment.find({ postId })
        .sort([['createdAt', -1]])
        .skip(Number(offset))
        .limit(Number(limit))
        .populate('userId', 'username avatar')
        .exec();
        console.log('Comments for post', postId, ':', comments);
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

// Update a comment's content
async function updateComment(commentId, newContent) {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content: newContent },
            { new: true }
        );
        console.log('Comment updated successfully:', updatedComment);
    } catch (error) {
        console.error('Error updating comment:', error);
    }
}

// Delete a comment
async function deleteComment(commentId) {
    try {
        await Comment.findByIdAndDelete(commentId);
        console.log('Comment deleted successfully');
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

export default{
    createComment,
    updateComment,
    deleteComment,
    getCommentsForPost
}