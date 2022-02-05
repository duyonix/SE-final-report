const router = require('express').Router({ mergeParams: true });
const classroomController = require('../controllers/ClassroomController');
const accessClassroom = require('../middleware/accessClassroom');

router.put('/join', classroomController.join);
router.post('/create', classroomController.create);

router.get('/:classroomId/people', accessClassroom, classroomController.people);
router.get('/:classroomId', accessClassroom, classroomController.get);
router.put('/:classroomId/removeStudent', accessClassroom, classroomController.removeStudent);
router.put('/:classroomId/leaveClassroom', accessClassroom, classroomController.leaveClassroom);
router.put('/:classroomId/inviteStudent', accessClassroom, classroomController.inviteStudent);
router.put('/:classroomId', accessClassroom, classroomController.update);
router.delete('/:classroomId', accessClassroom, classroomController.delete);

module.exports = router;
