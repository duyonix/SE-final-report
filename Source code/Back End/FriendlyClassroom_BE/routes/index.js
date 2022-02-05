const authorizeRoute = require('./authorize.route.js');
const userRoute = require('./user.route');
const documentRoute = require('./document.route');
const homeworkRoute = require('./homework.route');
const postRoute = require('./posts.route');
const auth = require('../middleware/auth');
const classroomRoute = require('./classroom.route');
const commentRoute = require('./comment.route');
const submissionRoute = require('./submission.route');
// const todoRoute = require('./todo.route')
const accessClassroom = require('../middleware/accessClassroom');

function route(app) {
    app.use('/api/authorize', authorizeRoute);
    app.use('/api/user', userRoute);
    app.use('/api/document', documentRoute);
    app.use('/api/homework', homeworkRoute);
    app.use('/api/submission', submissionRoute);
    // app.use('/api/todo', todoRoute)

    app.use('/api/classroom/:classroomId/post', auth, accessClassroom, postRoute);
    app.use('/api/classroom/:classroomId/post/:postId/comment', auth, accessClassroom, commentRoute);
    app.use('/api/classroom', auth, classroomRoute);
}

module.exports = route;
