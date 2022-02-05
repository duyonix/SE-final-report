const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Homework = new mongoose.Schema({
    classroomId: {
        type: ObjectId,
        ref: 'Classroom',
    },
    title: {
        type: String,
        required: true,
    },
    creatorId: {
        type: ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
    },
    deadline: {
        type: Date,
    },
    attachedFiles: [{
        type: String,
    }, ],
    fileAttributes: [{
        name: {
            type: String,
        },
        size: {
            type: String,
        },
        extension: {
            type: String,
        },
    }],
    topic: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Homework', Homework);