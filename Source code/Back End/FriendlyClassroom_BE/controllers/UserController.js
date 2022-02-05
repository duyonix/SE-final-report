const User = require('../models/User');
const firebase = require('../firebase');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const argon2 = require('argon2')
const fs = require('fs-extra');

const Homework = require('../models/Homework');
const Submission = require('../models/Submission');
const Classroom = require('../models/Classroom')

const findHomeworkIndex = (temp, homeworkId) => {
    console.log(temp)
    console.log(homeworkId)
    var l = 0
    var r = temp.length - 1
    while (l <= r) {
        var m = Math.round((l + r) / 2)
        if (homeworkId < temp[m].homeworkId) {
            r = m - 1
        } else if (homeworkId > temp[m].homeworkId) {
            l = m + 1
        } else return m
    }
    return -1
}

const convertToArray = (homeworksInClass) => {
    var res = []
    const n = homeworksInClass.topicHomework.length
    for (let i = 0; i < n; i++) {
        res = res.concat(homeworksInClass.topicHomework[i].homeworks)
    }
    return res
}

getSignedUrlAvatar = async(filename) => {
    const destinationFirebase = `avatar/${filename}`;
    const config = {
        action: 'read',
        expires: '08-08-2025',
    };
    const url = await firebase.bucket.file(destinationFirebase).getSignedUrl(config);
    return url;
};

const checkEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    return false
}

const checkPhoneNumber = (phoneNumber) => {
    if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phoneNumber)) {
        return true
    }
    return false
}

const getFilenameExtension = (filename) => {
    const names = filename.split('.')
    return names[names.length - 1]
}

createDefaultAvatarForUser = async(fullName) => {
    const splited = fullName.split(' ')
    const character = splited[splited.length - 1][0].toUpperCase()
    const destinationFirebase = `avatar/not avatar/${character}.jpg`
    const config = {
        action: 'read',
        expires: '08-08-2025'
    };
    const url = await firebase.bucket.file(destinationFirebase).getSignedUrl(config);
    return url
}

class UserController {
    getInformation = (req, res) => {
        try {
            const userId = req.userId;
            const username = req.username;
            User.findOne({ _id: userId })
                .populate({
                    path: 'classStudent classTeacher',
                    select: 'name code description teacherId numberOfMember',
                    populate: {
                        path: 'teacherId',
                        select: 'fullName avatarUrl',
                    },
                })
                .exec(async function(err, user) {
                    try {
                        if (err) {
                            throw new Error('ERROR');
                        }
                    } catch (err) {
                        return res.status(400).json({ success: false, message: 'Lỗi rồi :(' });
                    }
                    return res.status(200).json({ success: true, user });
                });
        } catch (err) {
            console.log(err);
        }
    };

    changeAvatar = async(req, res) => {
        try {
            const username = req.username;
            const userId = req.userId;
            const avatar = req.file;
            const ext = avatar.filename.split('.')[1];
            const filename = `${userId}.${ext}`;
            const filePath = `avatar/${filename}`;
            var options = {
                destination: filePath,
            };
            firebase.bucket.upload(avatar.path, options, async(err, item) => {
                try {
                    if (err) {
                        console.log(err)
                        throw new Error('ERROR');
                    }
                } catch (err) {
                    return res.status(400).json({ success: false, message: 'Lỗi rồi :<' });
                }
                const signedUrl = await getSignedUrlAvatar(filename);
                await User.findOneAndUpdate({ _id: userId }, { $set: { avatarUrl: signedUrl[0], ifHasAvatar: true } });
                fs.emptyDir('uploads/');
                return res.status(200).json({ success: true, message: 'Thay đổi avatar thành công !!!' });
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: 'Lỗi rồi :<' });
        }
    };
    isUserATeacherOfClass = async(userId, classroomId) => {
        const user = await User.find({
            _id: userId,
            classTeacher: { $in: [classroomId] },
        });
        /*var isOK = false
            user.classTeacher.forEach(element => {
                if (element.toString() === classroomId) {
                    isOK = true
                    return
                }
            });*/
        // console.log(user)
        if (user.length > 0) return true;
        else return false;
    };
    isUserAStudentOfClass = async(userId, classroomId) => {
        const user = await User.findOne({ _id: userId }, 'classStudent');
        var isOK = false;
        user.classStudent.forEach((element) => {
            // console.log(element.toString())
            // console.log(classroomId)
            if (element.toString() === classroomId) {
                isOK = true;
                return;
            }
        });
        return isOK;
    };
    isUserAMemberOfClass = async(userId, classroomId) => {
        const user = await User.findOne({ _id: userId }, 'classStudent classTeacher');
        if (classroomId in user.classStudent || classroomId in user.classTeacher) {
            return true;
        }
        return false;
    };

    // ydam
    todo = async(req, res) => {
        try {
            let submissions = await Submission.find({ studentId: req.userId })
                .select('homeworkId markDone')
                .populate('homeworkId')
                .populate({
                    path: 'homeworkId',
                    populate: [{ path: 'classroomId', select: 'name' }],
                    options: {
                        sort: { deadline: -1 },
                    },
                    select: 'classroomId title topic deadline',
                });

            res.json({ success: true, submissions: submissions });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };
    calendar = async(req, res) => {
        try {
            let submissions = await Submission.find({ studentId: req.userId })
                .select('homeworkId markDone')
                .populate('homeworkId')
                .populate({
                    path: 'homeworkId',
                    populate: [{ path: 'classroomId', select: 'name' }],
                    options: {
                        sort: { deadline: -1 },
                    },
                    select: 'classroomId title topic deadline',
                });

            res.json({ success: true, submissions: submissions });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };
    changeInformation = async(req, res) => {
        try {
            const username = req.body.username;
            var password = req.body.password;
            const email = req.body.email;
            const phoneNumber = req.body.phoneNumber;
            const fullName = req.body.fullName;
            const userId = req.userId

            if (!checkEmail(email)) throw new Error("not a email")
            if (!checkPhoneNumber(phoneNumber)) throw new Error("not a phone number")

            const user = await User.findOne({ username });
            if (user && !(user._id == userId)) {
                throw new Error("Username already taken")
            }
            password = await argon2.hash(password)
            if (user.ifHasAvatar == undefined || !user.ifHasAvatar) {
                const urls = await createDefaultAvatarForUser(fullName)
                await User.updateOne({ _id: userId }, { $set: { username: username, password: password, email: email, phoneNumber: phoneNumber, fullName: fullName, avatarUrl: urls[0], ifHasAvatar: false } })
                return res.status(200).json({ success: true, message: 'Change user information successfully' })
            }
            await User.updateOne({ _id: userId }, { $set: { username: username, password: password, email: email, phoneNumber: phoneNumber, fullName: fullName } })
            return res.status(200).json({ success: true, message: 'Change user information successfully' })
        } catch (err) {
            if (err.message === 'not a email') return res.status(400).json({ success: false, message: 'Email sai định dạng' })
            else if (err.message === 'not a phone number') return res.status(400).json({ success: false, message: 'Số điện thoại sai định dạng' })
            else if (err.message === "Username already taken")
                return res.status(400).json({ success: false, message: 'Tên người dùng đã tồn tại' })
            else {
                console.log(err)
                return res.status(400).json({ success: false, message: 'Loi roi :(' })
            }
        }
    }
    getAllScoreOf1User = async(req, res) => {
        try {
            const classroomId = req.body.classroomId
            const userId = req.userId
            const homeworksInClass =
                await Classroom.findOne({ _id: classroomId }, 'topicHomework')
                .populate({
                    path: 'topicHomework.homeworks',
                    select: 'title'
                })
            const homeworks = convertToArray(homeworksInClass)
            const submissions =
                await Submission.find({ studentId: userId, score: { $exists: true, $ne: null } }, 'homeworkId score')
                .populate({
                    path: 'homeworkId',
                    select: '_id',
                    match: { classroomId: classroomId }
                })
            const temp = []
            const result = []
            for (let i = 0; i < homeworks.length; i++) {
                const obj = {
                    homeworkId: homeworks[i]._id,
                    ith: i
                }
                temp.push(obj)
                result.push(null)
            }
            temp.sort((a, b) => (a.homeworkId < b.homeworkId ? -1 : 1))
            for (let i = 0; i < submissions.length; i++) {
                if(submissions[i].homeworkId==null) continue
                const index = findHomeworkIndex(temp, submissions[i].homeworkId._id)
                if (index != -1) {
                    const ith = temp[index].ith
                    result[ith] = submissions[i].score
                }
            }
            return res.status(200).json({ success: true, homeworks, result })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ success: false, message: 'Error' })
        }
    }
}

module.exports = new UserController();