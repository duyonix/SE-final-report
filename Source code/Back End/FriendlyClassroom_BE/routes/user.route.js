const router = require('express').Router();

const userController = require('../controllers/UserController');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: storage,
});

const auth = require('../middleware/auth');

router.get('/getInformation', auth, userController.getInformation);
router.post('/changeAvatar', auth, upload.single('avatar'), userController.changeAvatar);
router.get('/calendar', auth, userController.calendar);
router.get('/todo', auth, userController.todo);
router.post('/changeInformation', auth, userController.changeInformation)
router.post('/getAllScore', auth, userController.getAllScoreOf1User)

module.exports = router;