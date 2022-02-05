const router = require('express').Router();

const homeworkController = require('../controllers/HomeworkController');
const auth = require('../middleware/auth')

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
});

router.post('/createHomework', auth, upload.single('file'), homeworkController.createHomework)
router.post('/removeHomework', auth, homeworkController.removeHomework)
router.post('/getAllHomeworkMetadataOfClass', auth, homeworkController.getAllHomeworkMetadataOfClass)
router.post('/getHomeworkDetail', auth, homeworkController.getHomeworkDetail)
router.post('/changeHomeworkDeadline', auth, homeworkController.editHomeworkDeadline)
router.post('/changeHomework', auth, homeworkController.changeHomework)
router.post('/changeHomeworkFile', auth, upload.single('file'), homeworkController.changeHomeworkFile)
router.post('/eraseHomework', auth, homeworkController.eraseHomework)

module.exports = router