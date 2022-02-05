const requireLogin = require('../middleware/auth');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const Classroom = require('../models/Classroom');
const Comment = require('../models/Comment');

class PostController {
    get = async (req, res) => {
        try {
            const classroom = await Classroom.findById(req.params.classroomId)
                .select('listPost')
                .populate('listPost')
                .populate({
                    path: 'listPost',
                    populate: [
                        { path: 'postedBy', select: 'username avatarUrl' },
                        {
                            path: 'listComment',
                            populate: [{ path: 'commentedBy', select: 'username avatarUrl' }],
                            options: {
                                sort: { createdAt: -1 },
                            },
                        },
                    ],
                    options: {
                        sort: { createdAt: -1 },
                    },
                });
            res.json({ success: true, posts: classroom.listPost });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };
    detail = async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId)
                .populate('postedBy listComment')
                .sort('-createdAt')
                .populate({
                    path: 'listComment',
                    populate: [{ path: 'commentedBy', select: 'username avatarUrl' }],
                    options: {
                        sort: { createdAt: -1 },
                    },
                });

            if (!post) {
                throw new Error('Không tìm thấy post');
            }
            res.json({ success: true, post: post });
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
    create = async (req, res) => {
        const { body } = req.body;

        try {
            const newPost = new Post({
                classroomId: req.params.classroomId,
                body,
                postedBy: req.userId,
            });

            await newPost.save();
            let updatedClassroom = await Classroom.findOneAndUpdate(
                {
                    _id: req.params.classroomId,
                },
                { $push: { listPost: newPost } },
                { new: true }
            );
            res.json({
                success: true,
                message: 'Tạo post mới thành công',
                post: newPost,
                classroom: updatedClassroom,
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
            const postUpdateCondition = {
                _id: req.params.postId,
                postedBy: req.userId,
            };

            let updatedPost = await Post.findOneAndUpdate(
                postUpdateCondition,
                {
                    body,
                },
                { new: true }
            );

            if (!updatedPost) {
                throw new Error('Không tìm thấy post hoặc bạn không có quyền chỉnh sửa thông tin post này');
            }

            res.json({
                success: true,
                message: 'Cập nhật post thành công',
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

    delete = async (req, res) => {
        try {
            const postDeleteCondition = {
                _id: req.params.postId,
                postedBy: req.userId,
            };
            //  delete all comment have postId
            Comment.deleteMany({ postId: req.params.postId });

            // remove from Classroom
            let updatedClassroom = await Classroom.findById(req.params.classroomId);
            updatedClassroom.listPost.pull(req.params.postId);
            await updatedClassroom.save();

            const deletePost = await Post.findOneAndDelete(postDeleteCondition);

            if (!deletePost) {
                throw new Error('Không tìm thấy post hoặc bạn không có quyền xóa post này');
            }

            res.json({
                success: true,
                post: deletePost,
                message: 'Xóa post thành công',
                classroom: updatedClassroom,
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

module.exports = new PostController();
