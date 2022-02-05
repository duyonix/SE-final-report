import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Comments from "./comment/Comments.jsx";
import {
  deletePost,
  fetchAllPost,
  resetDeletePost,
} from "../redux/modules/Stream/Post/action";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function format2Digits(n) {
  return n < 10 ? "0" + n : n;
}
const convertDate = (date) => {
  date = new Date(date);
  let hours, minutes;
  hours = format2Digits(date.getHours());
  minutes = format2Digits(date.getMinutes());

  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();
  return " " + dd + "/" + mm + "/" + yyyy + " " + hours + ":" + minutes;
};
function Post(props) {
  let userId = null;

  if (localStorage.getItem("User")) {
    userId = JSON.parse(localStorage.getItem("User")).user._id;
  }
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dispatch = useDispatch();
  const dataDeletePost = useSelector((state) => state.deletePostReducer?.data);
  if (dataDeletePost) {
    dispatch(fetchAllPost(props.classroomId));
    dispatch(resetDeletePost());
  }
  const OptionMenu = () => {
    const options = [
      // { title: "Sửa" },
      // TODO: handleClickUpdate
      { title: "Xóa" },
      // TODO: handleClickDelete
    ];
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
      setAnchorEl(null);
    };
    const handleClickOption = (e) => {
      switch (e.target.innerText) {
        case "Sửa":
          break;
        case "Xóa":
          dispatch(deletePost(props.classroomId, props.id));

          break;
        default:
      }
    };
    return (
      <div className="option-menu">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem key={index} onClick={handleClickOption}>
              {option.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  return (
    <div className="post">
      <Card className="card-post" sx={{ maxWidth: 1400 }}>
        <div className="card-header-function">
          <CardHeader
            // key={props.id}
            sx={{ minWidth: 550 }}
            avatar={
              <Avatar
                //src={props.avatar} TODO: load avt of post
                src={props.avatar}
                alt="avatar"
                sx={{ width: 40, height: 40 }}
              />
            }
            title={<div className="post-author">{props.name}</div>}
            subheader={convertDate(props.time)}
          />
          {userId === props.idUserPost ? <OptionMenu /> : ""}
        </div>
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {props.body}
          </Typography>
        </CardContent>
        {
          <CardActions disableSpacing>
            <div className="show-helper-text">Xem thêm thảo luận</div>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        }
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {/* <Comments currentUserId="4" /> */}
          {/* TODO: load ID user to setup currentUserId*/}
          <Comments
            classroomId={props.classroomId}
            id={props.id}
            rootComments={props.listComments}
          />
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
