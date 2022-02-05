const Submission = require('../models/Submission');
const firebase = require('../firebase');
const Homework = require('../models/Homework');
const unitTable = ['B', 'KB', 'MB', 'GB', 'TB']
const Classroom = require('../models/Classroom')
const fs = require('fs-extra');

const isUserCanSeeSubmissionMetadataOfHomework = async(userId, homeworkId) => {
    const homework = await Homework.findOne({ _id: homeworkId }, "classroomId")
        .populate({
            path: "classroomId",
            select: "teacherId"
        })
    if (userId != homework.classroomId.teacherId) {
        console.log(userId)
        console.log(homework.classroomId.teacherId)
        return false
    }
    return true
}

const isUserCanAddScoreToSubmission = async(userId, homeworkId, studentId) => {
    const homework = await Homework.findOne({ _id: homeworkId }, "classroomId")
        .populate({
            path: "classroomId",
            select: "teacherId"
        })
    console.log(homework)
    if (userId != homework.classroomId.teacherId) {
        return false
    }
    return true
}

const checkIfUserSubmitted = async(homeworkId, studentId) => {
    const submission = await Submission.findOne({ homeworkId: homeworkId, studentId: studentId, markDone: true })
    if (!submission) {
        return false
    }
    return true
}

const isUserCanSeeSubmission = async(userId, homeworkId, studentId) => {
    if (userId === studentId) return true
    const homework = await Homework.findOne({ _id: homeworkId }, "classroomId")
        .populate({
            path: "classroomId",
            select: "teacherId"
        })
    console.log(homework)
    if (userId != homework.classroomId.teacherId) {
        return false
    }
    return true
}

getSignedUrlSubmission = async(homeworkId, studentId, filename) => {
    const destinationFirebase = `submission/${homeworkId}/${studentId}/${filename}`;
    const config = {
        action: 'read',
        expires: '08-08-2025',
    };
    const url = await firebase.bucket.file(destinationFirebase).getSignedUrl(config);
    return url;
};

convertSizeToProperUnit = (bytes) => {
    var i = 0
    while (bytes >= 1024) {
        i++
        bytes = bytes / 1024
    }
    bytes = Math.round(bytes * 100) / 100
    return `${bytes} ${unitTable[i]}`
}

getFileExtension = (filename) => {
    var i = filename.length - 1
    while (filename[i] != '.') {
        i = i - 1
    }
    return filename.substring(i + 1)
}

getArrayOfHomework = (topicHomework) => {
    var res = []
    const n = topicHomework.length
    for (let i = 0; i < n; i++) {
        res = res.concat(topicHomework[i].homeworks)
    }
    return res
}

findHomework = (temp, homeworkId) => {
    var left = 0
    var right = temp.length - 1
    while (left <= right) {
        var mid = Math.round((left + right) / 2)
        if (temp[mid].homeworkId < homeworkId) {
            left = mid + 1
        } else if (temp[mid].homeworkId > homeworkId) {
            right = mid - 1
        } else return mid
    }
    return null
}

createArrayResults = (arrayHomeworks, listStudent, submissions) => {
    var res = []
    const nStudent = listStudent.length
    const nHomework = arrayHomeworks.length
    for (let i = 0; i < nStudent; i++) {
        const student = {
            fullName: listStudent[i].fullName,
            studentId: listStudent[i]._id,
            avatarUrl: listStudent[i].avatarUrl
        }
        student.scores = Array.from({ length: nHomework }, (_, i) => null)
        res.push(student)
    }
    for (let i =0;i<submissions.length;i++){
        const studentId=submissions[i].studentId._id
        const homeworkId=submissions[i].homeworkId
        for(let j=0;j<res.length;j++){
            if(res[j].studentId.equals(studentId)){
                for (let t=0;t<nHomework;t++){
                    if(arrayHomeworks[t]._id.equals(homeworkId)){
                        res[j].scores[t]=submissions[i].score
                        break
                    }
                }
                break
            }
        }
    }
    return res
}

class SubmissionController {
    submitSubmission = (req, res) => {
        try {
            const studentId = req.userId;
            const homeworkId = req.body.homeworkId;
            const file = req.file;

            if (!file) {
                throw new Error('Not submission');
            }

            console.log(file)
            const size = convertSizeToProperUnit(file.size)
            const extension = getFileExtension(file.filename)
            const fileAttribute = {
                name: file.filename,
                size: size,
                extension: extension
            }
            console.log(fileAttribute)
            const lastModified = new Date()
            console.log(lastModified)

            var optionsFirebase = {
                destination: `submission/${homeworkId}/${studentId}/${file.filename}`,
            };

            // Only update default submission, not create new submission
            firebase.bucket.upload(file.path, optionsFirebase, async function(err, item) {
                const markDone = true;
                const urls = await getSignedUrlSubmission(homeworkId, studentId, file.filename)
                const attachedFiles = [urls[0]];
                const fileAttributes = [fileAttribute]
                await Submission.updateOne({ homeworkId: homeworkId, studentId: studentId }, { $set: { attachedFiles: attachedFiles, markDone: markDone, fileAttributes: fileAttributes, lastModified: lastModified } });
                fs.emptyDir('uploads/');
                return res.status(200).json({ success: true, message: 'Nộp thành công' });
            });

        } catch (err) {
            if (err.message == 'Not submission') {
                return res.status(400).json({ success: false, message: 'File bài làm của bạn đâu :(' });
            } else {
                console.log(err)
                return res.status(400).json({ success: false, message: 'ERROR' })
            }
        }
    };

    getSubmission = async(req, res) => {
        try {
            const userId = req.userId; // user who want to see submission
            const homeworkId = req.body.homeworkId;
            const studentId = req.body.studentId; // the owner of submission user want to see

            // only teacher and that student can see his submission
            const isValid = isUserCanSeeSubmission(userId, homeworkId, studentId)
            if (!isValid) {
                throw new Error("Rights")
            }

            // Maybe we dont need this because every student will have default submission
            const submission = await Submission.findOne({ homeworkId: homeworkId, studentId: studentId });
            if (!submission) {
                throw new Error('Not submit');
            }

            return res.status(200).json({ success: true, submission });

        } catch (err) {
            if (err.message == 'Rights') {
                return res.status(400).json({ success: false, message: 'Bạn không có quyền xem bài làm này' });
            } else if (err.message == 'Not submit') {
                return res.status(400).json({ success: false, message: 'Không tìm thấy bài nộp của bạn' });
            }
        }
    };

    addCommentAndScore = async(req, res) => {
        try {
            const score = req.body.score;
            const comment = req.body.comment;
            const studentId = req.body.studentId;
            const homeworkId = req.body.homeworkId;
            const userId = req.userId
            console.log(userId)
            const isValid = await isUserCanAddScoreToSubmission(userId, homeworkId, studentId)
            if (!isValid) {
                throw new Error("Rights")
            }

            await Submission.findOneAndUpdate({ homeworkId: homeworkId, studentId: studentId }, { $set: { score: score, comment: comment } });
            return res.status(200).json({ success: true, message: 'Đã thêm comment và điểm' });
        } catch (err) {
            if (err.message === "Rights") {
                return res.status(400).json({ success: false, message: 'Bạn không có quyền thêm điểm cho bài nộp này' });
            } else {
                console.log(err);
                return res.status(400).json({ success: false, message: 'Lỗi rồi :(' });
            }
        }
    };

    getAllSubmissionMetadataOfHomework = async(req, res) => {
        try {
            const homeworkId = req.body.homeworkId;
            const userId = req.userId
            const isValid = await isUserCanSeeSubmissionMetadataOfHomework(userId, homeworkId)
            if (!isValid) {
                throw new Error("Rights")
            }
            const result = await Submission.find({ homeworkId: homeworkId }).populate({
                path: 'studentId',
                select: 'fullName username avatarUrl',
            });
            return res.status(200).json(result);
        } catch (err) {
            if (err.message === "Rights") {
                return res.status(400).json({ success: false, message: "Bạn không có quyền truy cập phần này" })
            } else {
                return res.status(400).json({ success: false, message: 'Lỗi rồi :(' })
            }
        }
    };

    deleteSubmission = async(req, res) => {
        try {
            const studentId = req.userId
            const homeworkId = req.body.homeworkId

            const isOK = await checkIfUserSubmitted(homeworkId, studentId)
            if (!isOK) throw new Error('not submit')

            const lastModified = new Date()
                // await Submission.findOneAndUpdate({ studentId: studentId, homeworkId: homeworkId }, { $set: { markDone: false, attachedFiles: [], fileAttributes: [], comment: undefined, score: undefined, lastModified: lastModified } })
            const updatedSubmission = await Submission.findOne({ studentId: studentId, homeworkId: homeworkId })
            if (updatedSubmission.score) {
                updatedSubmission.score = undefined
            }
            if (updatedSubmission.comment) {
                updatedSubmission.comment = undefined
            }
            updatedSubmission.markDone = false
            updatedSubmission.attachedFiles = undefined
            updatedSubmission.fileAttributes = undefined
            updatedSubmission.lastModified = lastModified

            await updatedSubmission.save()
            await firebase.bucket.deleteFiles({
                prefix: `/submission/${homeworkId}/${studentId}`
            })
            return res.status(200).json({ success: true, message: 'Đã xóa bài làm của bạn cho bài tập này' })
        } catch (err) {
            if (err.message == 'not submit') {
                return res.status(400).json({ success: false, message: 'Chưa nộp sao xóa ?' })
            } else {
                console.log(err)
                return res.status(400).json({ success: false, message: 'Lỗi rồi :(' })
            }
        }
    }

    getAllScoreOf1Class = async(req, res) => {
        try{
            const classroomId = req.body.classroomId

            // get all homework of class in array
            const classroom = await Classroom.findOne({ _id: classroomId }, "topicHomework listStudent")
                .populate({
                    path: "topicHomework.homeworks",
                    select: "title createdAt"
                })
                .populate({
                    path: "listStudent",
                    select: 'fullName avatarUrl'
                })
            const arrayHomeworks = getArrayOfHomework(classroom.topicHomework)
            const submissions = await Submission.find({ homeworkId: { $in: arrayHomeworks }, score: { $exists: true, $ne: null } },
                "studentId score homeworkId"
            ).populate({
                path: 'studentId',
                select: 'username fullName'
            })
            const result = createArrayResults(arrayHomeworks, classroom.listStudent, submissions)
            return res.status(200).json({ arrayHomeworks, result })
        }
        catch(e){
            console.log(e)
            return res.status(400).json("Lỗi rồi")
        }
    }
}

module.exports = new SubmissionController();