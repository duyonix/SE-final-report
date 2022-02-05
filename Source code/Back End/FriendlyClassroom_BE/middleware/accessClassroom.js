const mongoose = require('mongoose');
const Classroom = require('../models/Classroom');

const verifyAccessClassroom = async (req, res, next) => {
    try {
        const classroom = await Classroom.findById(
            req.params.classroomId
        ).select('teacherId listStudent');
        if (!classroom) throw new Error('Không tìm thấy lớp học');

        if (
            classroom.listStudent.includes(req.userId) ||
            classroom.teacherId == req.userId
        )
            next();
        else {
            throw new Error('Bạn không được phép truy cập lớp học này');
        }
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

module.exports = verifyAccessClassroom;
