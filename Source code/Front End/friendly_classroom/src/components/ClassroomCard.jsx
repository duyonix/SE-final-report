import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DialogUpdateClassroom from "./DialogUpdateClassroom";
import DialogDeleteClassroom from "./DialogDeleteClassroom";
import DialogLeaveClassroom from "./DialogLeaveClassroom";
import DialogGetCodeClassroom from "./DialogGetCodeClassroom";

function ClassroomCard(props) {
  const { classInfo, role, index } = props;

  const bgColor = [
    "#bbecff",
    "#caffcc",
    "#d9caff",
    "#e8ffca",
    "#ffe2ca",
    "#e1e1e1",
  ];
  const bgColorItem = bgColor[index % bgColor.length];

  // Dialog Update Classroom
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  // Dialog Delete Classroom
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Dialog Leave Classroom
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

  const handleOpenLeaveDialog = () => {
    setOpenLeaveDialog(true);
  };

  const handleCloseLeaveDialog = () => {
    setOpenLeaveDialog(false);
  };

  // Dialog GetCode Classroom
  const [openGetCodeDialog, setOpenGetCodeDialog] = useState(false);

  const handleOpenGetCodeDialog = () => {
    setOpenGetCodeDialog(true);
  };

  const handleCloseGetCodeDialog = () => {
    setOpenGetCodeDialog(false);
  };

  const OptionMenu = (props) => {
    const { role } = props;

    const options =
      role === "student"
        ? [
            { title: "Lấy mã lớp", handleClick: handleOpenGetCodeDialog },
            { title: "Rời lớp học", handleClick: handleOpenLeaveDialog },
          ]
        : [
            { title: "Lấy mã lớp", handleClick: handleOpenGetCodeDialog },
            { title: "Chỉnh sửa", handleClick: handleOpenUpdateDialog },
            { title: "Xóa lớp học", handleClick: handleOpenDeleteDialog },
          ];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
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
            <MenuItem key={index} onClick={option.handleClick}>
              {option.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  return (
    <Card className="classroom-card" style={{ backgroundColor: bgColorItem }}>
      <DialogUpdateClassroom
        openUpdateDialog={openUpdateDialog}
        handleCloseUpdateDialog={handleCloseUpdateDialog}
        classInfo={classInfo}
      />

      <DialogDeleteClassroom
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        classInfo={classInfo}
      />

      <DialogLeaveClassroom
        openLeaveDialog={openLeaveDialog}
        handleCloseLeaveDialog={handleCloseLeaveDialog}
        classInfo={classInfo}
      />

      <DialogGetCodeClassroom
        openGetCodeDialog={openGetCodeDialog}
        handleCloseGetCodeDialog={handleCloseGetCodeDialog}
        classInfo={classInfo}
      />

      <OptionMenu role={role} />
      <Link
        to={{
          pathname: `/classroom/${classInfo._id}/stream`,
          role,
          classInfo,
        }}
        className="link-classroom"
      >
        <CardActionArea sx={{ height: 200 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              sx={{ fontWeight: 500 }}
            >
              {classInfo.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 4 }}>
              {classInfo.numberOfMember} thành viên
            </Typography>

            {role === "student" ? (
              <Stack
                className="classroom-card-info"
                direction="row"
                spacing={2}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {classInfo.teacherId?.fullName}
                </Typography>

                <Avatar
                  sx={{ width: "48px", height: "48px" }}
                  alt="User"
                  src={classInfo.teacherId?.avatarUrl}
                />
              </Stack>
            ) : (
              <div style={{ height: "48px" }}></div>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default ClassroomCard;
