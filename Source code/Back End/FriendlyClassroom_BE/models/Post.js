const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const Post = new Schema(
    {
        classroomId: {
            type: ObjectId,
            ref: 'Classroom',
        },
        body: {
            type: String,
            required: true,
        },
        listComment: [
            {
                type: ObjectId,
                ref: 'Comment',
            },
        ],
        postedBy: {
            type: ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Post', Post);
