import { combineReducers } from 'redux';
import loginReducer from '../modules/Login/reducer';
import registerReducer from '../modules/Register/reducer';
import {
    fetchUserInfoReducer,
    createClassroomReducer,
    joinClassroomReducer,
    updateClassroomReducer,
    deleteClassroomReducer,
    leaveClassroomReducer
} from '../modules/Home/reducer';
import {
    homeworkReducer,
    documentReducer,
    homeworkDetailReducer,
    documentDetailReducer,
    createHomeworkReducer,
    createDocumentReducer
} from '../modules/Homework/reducer';
import {
    submit_homeworkReducer,
    submissionReducer,
    submissionDeleteReducer
} from '../modules/SubmitHomework/reducer';
import {
    peopleReducer,
    inviteStudentReducer,
    deleteStudentReducer
} from '../modules/People/reducer';
import { fetchAllPostReducer, fetchSinglePostReducer, createPostReducer, updatePostReducer, deletePostReducer } from '../modules/Stream/Post/reducer';
import { createCommentReducer, updateCommentReducer, deleteCommentReducer } from '../modules/Stream/Comment/reducer';
import { updateHomeworkReducer, updateHomeworkFileReducer, updateDocumentReducer, updateDocumentFileReducer } from '../modules/UpdateHomeworkDocument/reducer';
import { fetchAllTodoReducer } from '../modules/Todo/reducer';
import { fetchAllCalendarReducer } from '../modules/Calendar/reducer';
import { fetchAllSubmissionReducer, addScoreReducer } from '../modules/HomeworkDetail/reducer';
import { fetchAllScoreClassroomReducer, fetchAllScoreUserReducer } from "../modules/Grade/reducer";
import { changeAvatarReducer } from '../modules/UserAccount/reducer';


const reducer = combineReducers({
    // Add reducers here
    loginReducer,
    registerReducer,
    fetchUserInfoReducer,
    createClassroomReducer,
    joinClassroomReducer,
    updateClassroomReducer,
    deleteClassroomReducer,
    leaveClassroomReducer,
    homeworkReducer,
    documentReducer,
    peopleReducer,
    inviteStudentReducer,
    deleteStudentReducer,
    homeworkDetailReducer,
    documentDetailReducer,
    submit_homeworkReducer,
    submissionReducer,
    fetchAllPostReducer,
    fetchSinglePostReducer,
    createPostReducer,
    updatePostReducer,
    deletePostReducer,
    createCommentReducer,
    updateCommentReducer,
    deleteCommentReducer,
    createHomeworkReducer,
    createDocumentReducer,
    submissionDeleteReducer,
    updateHomeworkReducer,
    updateHomeworkFileReducer,
    updateDocumentReducer,
    updateDocumentFileReducer,
    fetchAllTodoReducer,
    fetchAllCalendarReducer,
    fetchAllSubmissionReducer,
    addScoreReducer,
    fetchAllScoreClassroomReducer,
    fetchAllScoreUserReducer,
    changeAvatarReducer
});

export default reducer;
