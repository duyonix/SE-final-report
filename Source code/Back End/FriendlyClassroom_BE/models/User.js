const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        $regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNumber: {
        type: String,
        $regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    },
    avatarUrl: {
        type: String,
    },
    ifHasAvatar: {
        type: Boolean,
    },
    classStudent: [{
        type: ObjectId,
        ref: 'Classroom',
    }, ],
    classTeacher: [{
        type: ObjectId,
        ref: 'Classroom',
    }, ],

}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);