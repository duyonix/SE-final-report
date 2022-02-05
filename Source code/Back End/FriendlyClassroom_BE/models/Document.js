const { Binary } = require('bson');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Document = new mongoose.Schema({
    classroomId: {
        type: ObjectId,
        ref: 'Classroom'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    creatorId: {
        type: ObjectId,
        ref: 'User',
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
        }
    }],
    topic: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Document', Document);