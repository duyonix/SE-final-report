import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import {
  deleteComment,
  resetDeleteComment,
} from "../../redux/modules/Stream/Comment/action";
import { fetchAllPost } from "../../redux/modules/Stream/Post/action";
function Comment(props) {
  const dispatch = useDispatch();
  const isEditing =
    props.activeComment &&
    props.activeComment.id === props.comment.id &&
    props.activeComment.type === "editing";

  const fiveMinutes = 1800000;
  const timePassed =
    new Date() - new Date(props.comment.createdAt) > fiveMinutes;
  console.log(props.currentUserId);
  console.log(props.comment);
  const canDelete =
    props.currentUserId === props.comment.commentedBy._id && !timePassed;
  // const canEdit =
  //   props.currentUserId === props.comment.commentedBy._id && !timePassed;
  // const createdAt = new Date(props.comment.createdAt).toLocaleDateString();
  const dataDeleteComment = useSelector(
    (state) => state.deleteCommentReducer?.data
  );
  if (dataDeleteComment) {
    dispatch(fetchAllPost(props.classroomId));
    dispatch(resetDeleteComment());
  }
  return (
    <div key={props.comment.id} className="comment">
      <div className="comment-image-container">
        <Avatar
          // TODO: load avt of this author
          src={props.comment.commentedBy.avatarUrl}
          alt="avatar"
          sx={{ width: 40, height: 40 }}
        />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">
            {props.comment.commentedBy.username}
          </div>
          {/* <div>{props.comment.createdAt}</div> */}
        </div>
        {!isEditing && <div className="comment-text">{props.comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel={<DoneIcon />}
            hasCancelButton
            initialText={props.comment.body}
            handleSubmit={(text) => props.updateComment(text, props.comment.id)}
            handleCancel={() => {
              props.setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {/* {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                props.setActiveComment({
                  id: props.comment.id,
                  type: "editing",
                })
              }
            >
              Sửa
            </div>
          )} */}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => {
                dispatch(
                  deleteComment(
                    props.comment.classroomId,
                    props.comment.postId,
                    props.comment._id
                  )
                );
              }}
            >
              Xóa
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
