import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, CircularProgress } from "@mui/material";
import {
  fetchUserInfo,
  leaveClassroom,
  resetLeaveClassroom,
} from "../redux/modules/Home/action";

function DialogLeaveClassroom(props) {
  const { openLeaveDialog, handleCloseLeaveDialog, classInfo } = props;
  const classroomId = classInfo._id;

  const dispatch = useDispatch();
  const [render, setRender] = React.useState(false);

  const data = useSelector((state) => state.leaveClassroomReducer.data);
  const loading = useSelector((state) => state.leaveClassroomReducer.loading);
  const err = useSelector((state) => state.leaveClassroomReducer.err);

  const handleReset = () => {
    dispatch(resetLeaveClassroom());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(leaveClassroom(classroomId));
    setRender(!render);
  };

  const renderLoading = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
  };

  const renderError = () => {
    if (err) {
      setTimeout(handleReset, 1000);
      return <Alert severity="error">{err?.response.data.message}</Alert>;
    }
  };

  if (data) {
    alert("Rời lớp học thành công");
    handleReset();
    handleCloseLeaveDialog();
    dispatch(fetchUserInfo());
  }

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openLeaveDialog}
        onClose={handleCloseLeaveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ pb: 1 }}>
          Rời lớp học
        </DialogTitle>

        <DialogContent>
          {renderLoading()}
          {renderError()}

          <DialogContentText
            sx={{ color: "inherit", mt: 1 }}
            id="alert-dialog-description"
          >
            Khi rời khỏi lớp học {classInfo.name}, bạn sẽ không thể truy cập vào
            lớp nữa. Bạn có chắc chắn muốn rời khỏi lớp học này?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: "0 24px 20px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseLeaveDialog}
          >
            Hủy
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogLeaveClassroom;
