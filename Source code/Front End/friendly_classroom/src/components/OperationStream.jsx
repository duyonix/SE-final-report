import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { pathImgFromIndex } from "../utils/constants";
import { Avatar, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  fetchAllPost,
  createPost,
  resetCreatePost,
} from "../redux/modules/Stream/Post/action";

import { Box } from "@mui/material/node_modules/@mui/system";
// TODO: action call API
function OperationStream() {
  let className = null;
  if (localStorage.getItem("classInfo")) {
    className = JSON.parse(localStorage.getItem("classInfo")).name;
  }
  let avatar = null;
  if (localStorage.getItem("avatar")) {
    avatar = localStorage.getItem("avatar");
  }
  const { classroomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPost(classroomId));
    // eslint-disable-next-line
  }, []);
  //const errAllPost = useSelector((state) => state.fetchAllPostReducer?.err);
  const loadingAllPost = useSelector(
    (state) => state.fetchAllPostReducer?.loading
  );

  const dataAllPost = useSelector((state) => state.fetchAllPostReducer?.data);
  const initialPost = dataAllPost?.posts;
  //createPostReducer
  const [postBody, setPostBody] = useState(null);
  const handleInputPost = (e) => {
    setPostBody(e.target.value);
  };
  const renderLoading = () => {
    if (loadingAllPost) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
  };
  const handleCreatePost = () => {
    dispatch(createPost(classroomId, { body: postBody }));
  };
  const dataCreatePost = useSelector((state) => state.createPostReducer?.data);
  if (dataCreatePost) {
    dispatch(fetchAllPost(classroomId));
    dispatch(resetCreatePost());
    document.getElementById("inputPost").value = "";
  }

  return (
    <div>
      <div className="operation-stream container">
        <div className="classname">{className}</div>
        <div className="share">
          <div className="shareWrapper">
            <div className="shareTop">
              <Avatar
                // TODO: load avt of this user
                src={avatar}
                alt="avatar"
                sx={{ width: 40, height: 40 }}
              />
              <input
                id="inputPost"
                placeholder="Nhập nội dung ..."
                className="shareInput"
                onChange={handleInputPost}
              />
            </div>
            <hr className="shareHr" />
            <div className="shareBottom">
              <button className="shareButton" onClick={handleCreatePost}>
                {" "}
                Đăng{" "}
              </button>
              {/* <button className="cancelButton">Hủy</button> */}
            </div>
          </div>
        </div>
      </div>
      {renderLoading()}
      <div className="posts-container ">
        <div className="posts-poster">
          <img alt="post" src={pathImgFromIndex + "post.png"}></img>
        </div>

        <div className="posts-list">
          {initialPost?.map((post) => (
            <Post
              classroomId={classroomId}
              id={post._id}
              key={post._id}
              name={post.postedBy.username}
              avatar={post.postedBy.avatarUrl}
              body={post.body}
              time={post.updatedAt}
              listComments={post.listComment}
              idUserPost={post.postedBy._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OperationStream;
