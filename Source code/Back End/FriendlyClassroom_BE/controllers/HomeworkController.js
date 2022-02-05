const Homework = require('../models/Homework');
const firebase = require('../firebase');
const userController = require('./UserController');
const mongoose = require('mongoose');
const Classroom = require('../models/Classroom');
const Submission = require('../models/Submission');

const fs = require('fs-extra');

saveHomeworkToMongodb = async (
    _id,
    classroomId,
    title,
    creatorId,
    description,
    deadline,
    attachedFiles,
    fileAttributes,
    topic,
    duplicateTopicId
) => {
    const newHomework = new Homework({
        _id,
        classroomId,
        title,
        creatorId,
        description,
        deadline,
        attachedFiles,
        fileAttributes,
        topic,
    });
    await newHomework.save();
    createFakeSubmissionForEveryMemberInClass(classroomId, _id);

    // push new homework to list homework of class
    await Classroom.updateOne(
        { 'topicHomework._id': duplicateTopicId },
        { $push: { 'topicHomework.$.homeworks': _id } }
    );
};

createFakeSubmissionForEveryMemberInClass = async (classroomId, homeworkId) => {
    // When teacher create homework, every student in class have default submission
    const classMember = await Classroom.findOne(
        { _id: classroomId },
        'listStudent'
    );
    const markDone = false;
    const attachedFiles = [];
    classMember.listStudent.forEach(async (studentId) => {
        const newSubmission = new Submission({
            homeworkId,
            studentId,
            markDone,
            attachedFiles,
        });
        await newSubmission.save(); // consider to await
    });
};

getSignedUrlHomework = async (homeworkId, filename) => {
    const destinationFirebase = `homework/${homeworkId}/${filename}`;
    const config = {
        action: 'read',
        expires: '08-08-2025',
    };
    const url = await firebase.bucket
        .file(destinationFirebase)
        .getSignedUrl(config);
    return url;
};

const max = (a, b) => {
    return a > b ? a : b;
};

const reverseHomeworkIn1Topic = (topic) => {
    /*  New homework is pushed at tail of homeworks array
     *  We need to reverse homeworks array so the new homework will hoist to top
     */
    const n = topic.homeworks.length;
    for (let i = 0; i <= max(n / 2 - 1, 0); i++) {
        const temp = topic.homeworks[i];
        topic.homeworks[i] = topic.homeworks[n - 1 - i];
        topic.homeworks[n - 1 - i] = temp;
    }
};

const reverseTopic = (topics) => {
    /* New topic is pushed at tail of topics array
     * We need to reverse topics array so the new topic will hoist to top
     */
    const n = topics.length;
    for (let i = 0; i <= max(n / 2 - 1, 0); i++) {
        const temp = topics[i];
        topics[i] = topics[n - 1 - i];
        topics[n - 1 - i] = temp;
        reverseHomeworkIn1Topic(topics[i]);
        if (n > 1) reverseHomeworkIn1Topic(topics[n - 1 - i]);
    }
};

const addNewTopic = async (classroomId, topic) => {
    var myId = mongoose.Types.ObjectId();
    await Classroom.updateOne(
        { _id: classroomId },
        { $push: { topicHomework: { _id: myId, topic: topic, homeworks: [] } } }
    );
    return myId;
};

const checkIfDuplicate = async (classroomId, topic) => {
    /* check if we have same topic in class
     * return id of topic if yes, otherwise is null
     * return array of topics can be used for check if we have homework with same title in class
     */
    const updatedClassroom = await Classroom.findOne(
        { _id: classroomId },
        'topicHomework'
    ).populate({
        path: 'topicHomework.homeworks',
        select: 'title',
    });
    const topics = updatedClassroom.topicHomework;
    var duplicateTopicId = null;
    var isTheLastHomeworkOfTopic = false;
    for (let i = 0; i < topics.length; i++) {
        if (topics[i].topic === topic) {
            duplicateTopicId = topics[i]._id;
            if (topics[i].homeworks.length == 1) {
                isTheLastHomeworkOfTopic = true;
            }
            break;
        }
    }
    return { duplicateTopicId, topics, isTheLastHomeworkOfTopic };
};

Number.prototype.padLeft = function (base, chr) {
    var len = String(base || 10).length - String(this).length + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
};

const changeDeadlineISOToDeadline = (deadlineISO) => {
    const d = new Date(deadlineISO);
    const deadline =
        [
            (d.getMonth() + 1).padLeft(),
            d.getDate().padLeft(),
            d.getFullYear(),
        ].join('/') +
        ' ' +
        [
            d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft(),
        ].join(':');
    return deadline;
};

const checkIfDuplicateTitle = (topics, title, homeworkId) => {
    // check if exists another documents with same title in class
    for (let i = 0; i < topics.length; i++) {
        for (let j = 0; j < topics[i].homeworks.length; j++) {
            if (
                topics[i].homeworks[j].title === title &&
                topics[i].homeworks[j]._id != homeworkId
            ) {
                return true;
            }
        }
    }
    return false;
};

const getIdOfTopic = (topics, topic) => {
    var topicId = null;
    for (let i = 0; i < topics.length; i++) {
        if (topics[i].topic === topic) {
            topicId = topics[i]._id;
            break;
        }
    }
    return topicId;
};

const removeHomeworkOutOfTopic = async (
    duplicateTopicId,
    homeworkId,
    classroomId,
    isTheLastHomeworkOfTopic
) => {
    if (isTheLastHomeworkOfTopic) {
        await Classroom.updateOne(
            { _id: classroomId },
            { $pull: { topicHomework: { _id: duplicateTopicId } } }
        );
    } else
        await Classroom.updateOne(
            { 'topicHomework._id': duplicateTopicId },
            { $pull: { 'topicHomework.$.homeworks': homeworkId } }
        );
};

const changeTopic = async (
    duplicateTopicId,
    topicId,
    topic,
    homeworkId,
    classroomId,
    isTheLastHomeworkOfTopic
) => {
    await removeHomeworkOutOfTopic(
        duplicateTopicId,
        homeworkId,
        classroomId,
        isTheLastHomeworkOfTopic
    );
    if (!topicId) {
        topicId = await addNewTopic(classroomId, topic);
    }
    await Classroom.updateOne(
        { 'topicHomework._id': topicId },
        { $push: { 'topicHomework.$.homeworks': homeworkId } }
    );
};

const getFilenameFromURL = (url) => {
    const splited = url.split('/');
    console.log(splited);
    const result = splited[splited.length - 1].split('?')[0];
    return result.replace('%20', ' ');
};

convertSizeToProperUnit = (bytes) => {
    var i = 0;
    while (bytes >= 1024) {
        i++;
        bytes = bytes / 1024;
    }
    bytes = Math.round(bytes * 100) / 100;
    return `${bytes} ${unitTable[i]}`;
};

getFileExtension = (filename) => {
    var i = filename.length - 1;
    while (filename[i] != '.') {
        i = i - 1;
    }
    return filename.substring(i + 1);
};

class HomeworkController {
    createHomework = async (req, res) => {
        try {
            const file = req.file;
            const creatorId = req.userId;
            const classroomId = req.body.classroomId;
            const title = req.body.title;
            const description = req.body.description;
            const deadlineISO = req.body.deadline; // yyyy/mm/dd hh:mm:ss

            const topic = req.body.topic;
            const attachedFiles = [];
            const fileAttributes = [];

            const deadline = changeDeadlineISOToDeadline(deadlineISO);

            /*
            // Only teacher of class can create homework
            const isValid = await userController.isUserATeacherOfClass(creatorId, classroomId)
            if (!isValid) {
                throw new Error('Rights')
            }
            */
            // console.log("description: ", description);

            var { duplicateTopicId, topics, isTheLastHomeworkOfTopic } =
                await checkIfDuplicate(classroomId, topic);

            // check if class has homework which has same title
            for (let i = 0; i < topics.length; i++) {
                for (let j = 0; j < topics[i].homeworks.length; j++) {
                    if (topics[i].homeworks[j].title === title) {
                        throw new Error(
                            '2 homeworks have same name in 1 class'
                        );
                    }
                }
            }
            if (!duplicateTopicId) {
                duplicateTopicId = await addNewTopic(classroomId, topic);
            }
            var _id = mongoose.Types.ObjectId();

            // If dont have file, save right now
            if (!file) {
                await saveHomeworkToMongodb(
                    _id,
                    classroomId,
                    title,
                    creatorId,
                    description,
                    deadline,
                    attachedFiles,
                    fileAttributes,
                    topic,
                    duplicateTopicId
                );
                return res
                    .status(200)
                    .json({ success: true, message: 'Homework is added' });
            }

            // If have file, save file first and save in mongodb later
            // place I save file homework on Firebase

            const options = {
                destination: `homework/${_id}/${file.filename}`,
            };
            await firebase.bucket.upload(file.path, options);
            const url = await getSignedUrlHomework(_id, file.filename);
            attachedFiles.push(url[0]);
            const size = convertSizeToProperUnit(file.size);
            const extension = getFileExtension(file.filename);
            const fileAttribute = {
                name: file.filename,
                size: size,
                extension: extension,
            };
            fileAttributes.push(fileAttribute);
            await saveHomeworkToMongodb(
                _id,
                classroomId,
                title,
                creatorId,
                description,
                deadline,
                attachedFiles,
                fileAttributes,
                topic,
                duplicateTopicId
            );

            fs.emptyDir('uploads/');
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Bài tập đã thêm thành công',
                    id: _id,
                });
        } catch (err) {
            if (err.message == 'Rights') {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Chỉ có giáo viên mới được thêm bài tập',
                    });
            } else if (
                err.message === '2 homeworks have same name in 1 class'
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Không thể có 2 bài tập về nhà cùng tên được',
                    });
            } else {
                console.log(err);
                return res
                    .status(400)
                    .json({ success: false, message: 'ERROR' });
            }
        }
    };
    removeHomework = (req, res) => {};
    editHomeworkDeadline = async (req, res) => {
        try {
            const classroomId = req.body.classroomId;
            const title = req.body.title;
            const newDeadline = req.body.newDeadline;
            await Homework.updateOne(
                { classroomId: classroomId, title: title },
                { $set: { deadline: newDeadline } }
            );
            return res
                .status(200)
                .json({ success: true, message: 'Deadline is changed' });
        } catch (err) {
            console.log(err);
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Error in changing deadline',
                });
        }
    };
    getAllHomeworkMetadataOfClass = async (req, res) => {
        // return title and deadline of all homework in 1 class
        const classroomId = req.body.classroomId;
        const topicHomework = await Classroom.findOne(
            { _id: classroomId },
            'topicHomework'
        ).populate({
            path: 'topicHomework.homeworks',
            select: 'title deadline fileAttributes',
        });
        const topics = topicHomework.topicHomework;
        if (topics.length === 0) {
            return res.status(200).json(topics);
        }
        // We need to reverse topics so newly topic will hoist to top
        reverseTopic(topics);
        return res.status(200).json(topics);
    };

    getHomeworkDetail = async (req, res) => {
        // get all information about homework
        try {
            const homeworkId = req.body.homeworkId;
            const homework = await Homework.findOne({ _id: homeworkId });
            if (!homework) {
                throw new Error('Not exists');
            }
            var filename;
            if (homework.attachedFiles.length > 0)
                filename = getFilenameFromURL(homework.attachedFiles[0]);
            else filename = undefined;
            return res.status(200).json({ success: true, homework, filename });
        } catch (err) {
            if (err.message == 'Not exists') {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Homework doesnt exists',
                    });
            } else {
                console.log(err);
                return res.status(400).json('ERROR');
            }
        }
    };

    changeHomework = async (req, res) => {
        try {
            const homeworkId = req.body.homeworkId;
            const title = req.body.title;
            const description = req.body.description;
            const topic = req.body.topic;
            const deadlineISO = req.body.deadline;
            const deadline = changeDeadlineISOToDeadline(deadlineISO);

            const updatedHomework = await Homework.findOne({ _id: homeworkId });
            if (!updatedHomework) {
                throw new Error('No homework');
            }

            const classId = updatedHomework.classroomId;
            const oldTopic = updatedHomework.topic;

            var { duplicateTopicId, topics, isTheLastHomeworkOfTopic } =
                await checkIfDuplicate(classId, oldTopic);
            const isTitleExist = checkIfDuplicateTitle(
                topics,
                title,
                homeworkId
            );
            if (isTitleExist) {
                throw new Error('2 homeworks have same title in 1 class');
            }

            // consider to erase this block of code
            if (!duplicateTopicId) {
                throw new Error('ERROR');
            }

            var topicId = getIdOfTopic(topics, topic);
            if (oldTopic != topic) {
                await changeTopic(
                    duplicateTopicId,
                    topicId,
                    topic,
                    homeworkId,
                    classId,
                    isTheLastHomeworkOfTopic
                );
            }

            await Homework.findOneAndUpdate(
                { _id: homeworkId },
                {
                    $set: {
                        title: title,
                        description: description,
                        topic: topic,
                        deadline: deadline,
                    },
                }
            );
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Change homework successfully',
                });
        } catch (err) {
            if (err.message == '2 homeworks have same title in 1 class') {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: '1 lớp không thể có 2 bai tap cùng tên',
                    });
            } else if (err.message === 'No homework') {
                return res
                    .status(400)
                    .json({
                        success: true,
                        message: 'Bài tập không tồn tại hoặc đã bị xóa',
                    });
            } else {
                console.log(err);
                res.status(400).json({ success: false, message: 'ERROR' });
            }
        }
    };

    changeHomeworkFile = async (req, res) => {
        try {
            const homeworkId = req.body.homeworkId;
            const file = req.file;

            const updatedHomework = await Homework.findOne({ _id: homeworkId });
            if (!updatedHomework) {
                throw new Error('No homework');
            }
            await firebase.bucket.deleteFiles({
                prefix: `homework/${homeworkId}`,
            });

            if (!file) {
                await Homework.updateOne(
                    { _id: homeworkId },
                    { $set: { attachedFiles: [], fileAttributes: [] } }
                );
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: 'Đã xóa file cho bài tập này',
                    });
            }

            const options = {
                destination: `homework/${homeworkId}/${file.filename}`,
            };

            await firebase.bucket.upload(file.path, options);
            const urls = await getSignedUrlHomework(homeworkId, file.filename);
            const size = convertSizeToProperUnit(file.size);
            const extension = getFileExtension(file.filename);
            const fileAttribute = {
                name: file.filename,
                size: size,
                extension: extension,
            };
            const fileAttributes = [fileAttribute];
            await Homework.updateOne(
                { _id: homeworkId },
                {
                    $set: {
                        attachedFiles: urls,
                        fileAttributes: fileAttributes,
                    },
                }
            );
            fs.emptyDir('uploads/');
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Thay đổi file cho bài tập thành công',
                });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: 'ERROR' });
        }
    };

    eraseHomework = async (req, res) => {
        try {
            const homeworkId = req.body.homeworkId;
            console.log(homeworkId);

            const updatedHomework = await Homework.findOne(
                { _id: homeworkId },
                'classroomId topic'
            );
            if (!updatedHomework) {
                throw new Error('No document');
            }
            const classroomId = updatedHomework.classroomId;
            const topic = updatedHomework.topic;
            var { duplicateTopicId, topics, isTheLastHomeworkOfTopic } =
                await checkIfDuplicate(classroomId, topic);
            await removeHomeworkOutOfTopic(
                duplicateTopicId,
                homeworkId,
                classroomId,
                isTheLastHomeworkOfTopic
            );
            await Homework.findOneAndDelete({ _id: homeworkId });
            await Submission.deleteMany({ homeworkId: homeworkId });
            // destination: `submission/${homeworkId}/${studentId}/${file.filename}`,
            await firebase.bucket.deleteFiles({
                prefix: `submission/${homeworkId}`,
            });
            await firebase.bucket.deleteFiles({
                prefix: `homework/${homeworkId}`,
            });
            return res
                .status(200)
                .json({ success: true, message: 'Xóa thành công' });
        } catch (err) {
            if (err.message === 'No document') {
                return res
                    .status(400)
                    .json({
                        success: true,
                        message: 'Bài tập không tồn tại hoặc đã bị xóa',
                    });
            } else {
                console.log(err);
                return res
                    .status(400)
                    .json({ success: true, message: 'Lỗi rồi' });
            }
        }
    };
}

module.exports = new HomeworkController();
