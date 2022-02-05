import { useState } from "react";
import CommentForm from "./CommentForm.jsx";
import Comment from "./Comment.jsx";
import SendIcon from "@mui/icons-material/Send";
function Comments(props) {
  const [activeComment, setActiveComment] = useState(null);
  let userId = null;

  if (localStorage.getItem("User")) {
    userId = JSON.parse(localStorage.getItem("User")).user._id;
  }
  const rootComments = props.rootComments;
  return (
    <div className="comments">
      <div className="comments-container">
        {rootComments?.map((rootComment) => (
          <Comment
            classroomId={props.classroomId}
            postId={props.id}
            className="comment-child"
            key={rootComment._id}
            comment={rootComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            // addComment={addComment}
            // deleteComment={deleteComment}
            // updateComment={updateComment}
            currentUserId={userId}
          />
        ))}
      </div>
      <CommentForm
        classroomId={props.classroomId}
        id={props.id}
        submitLabel={<SendIcon />}
        // handleSubmit={addComment}
      />
    </div>
  );
}

export default Comments;
