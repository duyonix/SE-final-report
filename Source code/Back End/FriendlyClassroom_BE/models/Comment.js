const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Comment = new Schema(
    {
        classroomId: {
            type: ObjectId,
            ref: 'classroomId',
        },
        postId: {
            type: ObjectId,
            ref: 'Post',
        },
        commentedBy: {
            type: ObjectId,
            ref: 'User',
        },
        body: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Comment', Comment);
