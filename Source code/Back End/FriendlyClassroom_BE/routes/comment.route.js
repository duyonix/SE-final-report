const router = require('express').Router({ mergeParams: true });
const commentController = require('../controllers/CommentController');

router.post('/', commentController.create);
router.put('/:commentId', commentController.update);
router.delete('/:commentId', commentController.delete);

module.exports = router;
