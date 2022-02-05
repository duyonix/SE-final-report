const router = require('express').Router();
const authorizeController = require('../controllers/AuthorizeController');

router.route('/signup').post(authorizeController.signup);
router.route('/login').post(authorizeController.login);

module.exports = router;