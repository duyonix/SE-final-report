const requireLogin = require('../middleware/auth');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const Classroom = require('../models/Classroom');
const Comment = require('../models/Comment');

class CommentController {
    create = async (req, res) => {
        const { body } = req.body;

        try {
            const newComment = new Comment({
                classroomId: req.params.classroomId,
                postId: req.params.postId,
                body,
                commentedBy: req.userId,
            });

            await newComment.save();
            let updatedPost = await Post.findOneAndUpdate(
                {
                    _id: req.params.postId,
                },
                { $push: { listComment: newComment } },
                { new: true }
            );
            res.json({
                success: true,
                message: 'comment thành công',
                comment: newComment,
                post: updatedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };

    update = async (req, res) => {
        const { body } = req.body;

        try {
            const commentUpdateCondition = {
                _id: req.params.commentId,
                commentedBy: req.userId,
            };

            let updatedComment = await Comment.findOneAndUpdate(
                commentUpdateCondition,
                {
                    body,
                },
                { new: true }
            );

            // User not authorized to update post or post not found
            if (!updatedComment) {
                throw new Error(
                    'Không tìm thấy comment hoặc user không có quyền chỉnh sửa comment này'
                );
            }

            res.json({
                success: true,
                message: 'Cập nhật comment thành công',
                comment: updatedComment,
            });
        } catch (error) {
            if (error.message)
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };

    delete = async (req, res) => {
        try {
            const commentDeleteCondition = {
                _id: req.params.commentId,
                commentedBy: req.userId,
            };

            let updatedPost = await Post.findById(req.params.postId);
            updatedPost.listComment.pull(req.params.commentId);
            await updatedPost.save();

            const deleteComment = await Comment.findOneAndDelete(
                commentDeleteCondition
            );

            if (!deleteComment) {
                throw new Error(
                    'Không tìm thấy comment hoặc user không có quyền xóa comment này'
                );
            }

            res.json({
                success: true,
                message: 'Xóa comment thành công',
                comment: deleteComment,
                post: updatedPost,
            });
        } catch (error) {
            if (error.message)
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };
}

module.exports = new CommentController();
