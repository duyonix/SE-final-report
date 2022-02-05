const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Classroom = require('../models/Classroom');
const Submission = require('../models/Submission')
const firebase = require('../firebase');

const createDefaultSubmissionForEveryHomeworkInClass = async(code, studentId) => {
    const result = await Classroom.findOne({ code: code }, "topicHomework")
    const markDone = false
    const attachedFiles = []
    for (let i = 0; i < result.topicHomework.length; i++) {
        const topic = result.topicHomework[i];
        for (let j = 0; j < topic.homeworks.length; j++) {
            const homeworkId = topic.homeworks[j];
            const newSubmission = new Submission({
                homeworkId,
                studentId,
                markDone,
                attachedFiles
            });
            await newSubmission.save();
        }
    }
};

const convertToArray = (topicHomework) => {
    var res = []
    const n = topicHomework.length
    for (let i = 0; i < n; i++) {
        res = res.concat(topicHomework[i].homeworks)
    }
    return res
}

const deleteSubmissionsOfStudentInClass = async(studentId, classroomId) => {
    const result = await Classroom.findOne({ _id: classroomId }, "topicHomework")
    console.log(result.topicHomework)
    const homeworks = convertToArray(result.topicHomework)
    console.log(homeworks)
    await Submission.deleteMany({ studentId: studentId, homeworkId: { $in: homeworks } })
        // submission/${homeworkId}/${studentId}/${file.filename}
    for (let i = 0; i < homeworks.length; i++) {
        await firebase.bucket.deleteFiles({
            prefix: `submission/${homeworks[i]}/${studentId}`
        })
    }
}

class ClassroomController {
    get = async(req, res) => {
        try {
            const classroom = await Classroom.findById(
                req.params.classroomId,
                'name code description listPost teacherId listStudent numberOfMember topicDocument.topic topicHomework.topic'
            );
            res.json({ success: true, classroom });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };

    create = async(req, res) => {
        const { name, description } = req.body;
        try {
            // check if user is already teacher of another classroom which has the same name

            let checkDuplicateNameClassroom = await Classroom.findOne({
                name,
                teacherId: req.userId,
            });

            if (checkDuplicateNameClassroom) {
                throw new Error('Tên lớp học bị trùng');
            }

            let code = Math.random().toString(36).substring(2, 8);
            // check code unique
            while (await Classroom.findOne({ code: code })) {
                code = Math.random().toString(36).substring(2, 8);
            }

            var numberOfMember = 1;
            const topicDocument = [];
            const topicHomework = [];
            const newClassroom = new Classroom({
                name,
                code,
                description,
                teacherId: req.userId,
                numberOfMember,
                topicDocument,
                topicHomework,
            });
            const result = await newClassroom.save();
            res.json({
                success: true,
                message: 'Tạo lớp học thành công',
                classroom: newClassroom,
            });

            // Add classroom id to classTeacher
            await User.findOneAndUpdate({ _id: req.userId }, { $push: { classTeacher: result._id } });
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
    // @route PUT api/posts
    // @desc Update post
    // @access Private
    update = async(req, res) => {
        const { name, description } = req.body;

        try {
            if (name) {
                // check if user is already teacher of another classroom which has the same name

                let checkDuplicateNameClassroom = await Classroom.findOne({
                    name,
                    teacherId: req.userId,
                });

                if (
                    checkDuplicateNameClassroom &&
                    checkDuplicateNameClassroom._id != req.params.classroomId
                ) {
                    throw new Error('Tên lớp học bị trùng');
                }
            }

            const classroomUpdateCondition = {
                _id: req.params.classroomId,
                teacherId: req.userId,
            };

            let updatedClassroom = await Classroom.findOneAndUpdate(
                classroomUpdateCondition, {
                    name,
                    description,
                }, { new: true }
            );

            // User not authorized to update classroom or classroom not found
            if (!updatedClassroom) {
                throw new Error(
                    'Bạn không có quyền chỉnh sửa thông tin lớp này'
                );
            }

            res.json({
                success: true,
                message: 'Cập nhật thông tin lớp thành công',
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

    delete = async(req, res) => {
        try {
            const classroomDeleteCondition = {
                _id: req.params.classroomId,
                teacherId: req.userId,
            };

            const deleteClassroom = await Classroom.findOne(
                classroomDeleteCondition
            ).lean();

            if (!deleteClassroom) {
                throw new Error('Bạn không có quyền xóa lớp này');
            }

            //  delete all comment & post have classroomId
            await Comment.deleteMany({ classroomId: req.params.classroomId });
            await Post.deleteMany({ classroomId: req.params.classroomId });

            // delete classroom id from user
            //teacher
            let teacher = await User.findOne({
                _id: deleteClassroom.teacherId,
            });
            teacher.classTeacher.pull({ _id: req.params.classroomId });

            await teacher.save();

            //student

            for (let studentId of deleteClassroom.listStudent) {
                let student = await User.findOne({ _id: studentId });

                student.classStudent.pull({ _id: req.params.classroomId });
                await student.save();
            }

            // TODO: Xóa homework, document, submission ulatr :#333

            // delete classroom
            await Classroom.deleteOne({ _id: req.params.classroomId });
            res.json({
                success: true,
                message: 'Xóa lớp thành công',
                classroom: deleteClassroom,
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

    join = async(req, res) => {
        const { code } = req.body;
        try {
            let updatedClassroom = await Classroom.findOne({ code: code });

            if (!updatedClassroom) {
                throw new Error('Không tìm thấy lớp học này');
            }

            if (
                updatedClassroom.teacherId == req.userId ||
                updatedClassroom.listStudent.includes(req.userId)
            ) {
                throw new Error('Người dùng đã tham gia lớp này');
            }

            updatedClassroom.listStudent.push(req.userId);
            updatedClassroom.numberOfMember += 1;   
            await updatedClassroom.save();

            // TODO: cập nhật danh sách classroom cũa user
            let updatedMember = await User.findOne({ _id: req.userId });
            updatedMember.classStudent.push(updatedClassroom._id);
            await updatedMember.save();

            await createDefaultSubmissionForEveryHomeworkInClass(
                code,
                req.userId
            );

            res.json({
                success: true,
                message: 'Tham gia lớp học thành công',
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
    removeStudent = async(req, res) => {
        const { studentId } = req.body;

        try {
            const classroomUpdateCondition = {
                _id: req.params.classroomId,
                teacherId: req.userId,
            };

            let updatedClassroom = await Classroom.findOne(
                classroomUpdateCondition
            );

            if (!updatedClassroom) {
                throw new Error('Bạn không có quyền xóa học sinh');
            }
            if (!updatedClassroom.listStudent.includes(studentId)) {
                throw new Error('Học sinh này không có trong lớp');
            }
            updatedClassroom.listStudent.pull({ _id: studentId });

            updatedClassroom.numberOfMember -= 1;
            await updatedClassroom.save();

            // TODO: cập nhật danh sách classroom cũa user
            let updatedMember = await User.findOne({ _id: studentId });
            updatedMember.classStudent.pull({ _id: req.params.classroomId });

            await updatedMember.save();
            await deleteSubmissionsOfStudentInClass(studentId, req.params.classroomId)
            res.json({
                success: true,
                message: 'Xóa học sinh thành công',
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
    leaveClassroom = async(req, res) => {
        try {
            let updatedClassroom = await Classroom.findOne({
                _id: req.params.classroomId,
            });

            if (updatedClassroom.teacherId == req.userId) {
                throw new Error('Giáo viên không được phép rời lớp!');
            }

            updatedClassroom.listStudent.pull({ _id: req.userId });

            updatedClassroom.numberOfMember -= 1;
            await updatedClassroom.save();

            // TODO: cập nhật danh sách classroom cũa user
            let updatedMember = await User.findOne({ _id: req.userId });
            updatedMember.classStudent.pull({ _id: req.params.classroomId });

            await updatedMember.save();
            res.json({
                success: true,
                message: 'Rời lớp học thành công',
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

    inviteStudent = async(req, res) => {
        const { username } = req.body;

        try {
            const classroomUpdateCondition = {
                _id: req.params.classroomId,
                teacherId: req.userId,
            };

            let updatedClassroom = await Classroom.findOne(
                classroomUpdateCondition
            );

            if (!updatedClassroom) {
                throw new Error('Bạn không có quyền thêm học sinh');
            }

            const student = await User.findOne({ username: username });

            if (!student) {
                throw new Error('Không tồn tại user này');
            }
            if (updatedClassroom.listStudent.includes(student._id)) {
                throw new Error('Học sinh này đã tham gia lớp học');
            }

            if (req.userId == student._id) {
                throw new Error('Bạn đã tham gia lớp học');
            }

            updatedClassroom.listStudent.push({ _id: student._id });

            updatedClassroom.numberOfMember += 1;
            await updatedClassroom.save();

            // TODO: cập nhật danh sách classroom cũa user

            student.classStudent.push({ _id: req.params.classroomId });
            const code = updatedClassroom.code
            await createDefaultSubmissionForEveryHomeworkInClass(code, student._id)
            await student.save();
            res.json({
                success: true,
                message: 'Thêm học sinh thành công',
                classroom: updatedClassroom,
            });
        } catch (error) {
            if (error.message){
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            } 
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };

    people = async(req, res) => {
        try {
            const classroom = await Classroom.findById(req.params.classroomId)
                .select('teacherId listStudent')
                .populate('teacherId listStudent');

            res.json({ success: true, classroom });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi rồi :(',
            });
        }
    };
}

module.exports = new ClassroomController();