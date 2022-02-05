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
  deleteClassroom,
  fetchUserInfo,
  resetDeleteClassroom,
} from "../redux/modules/Home/action";

function DialogDeleteClassroom(props) {
  const { openDeleteDialog, handleCloseDeleteDialog, classInfo } = props;
  const classroomId = classInfo._id;

  const dispatch = useDispatch();
  const [render, setRender] = React.useState(false);

  const data = useSelector((state) => state.deleteClassroomReducer.data);
  const loading = useSelector((state) => state.deleteClassroomReducer.loading);
  const err = useSelector((state) => state.deleteClassroomReducer.err);

  const handleReset = () => {
    dispatch(resetDeleteClassroom());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteClassroom(classroomId));
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
    alert("Xóa lớp học thành công");
    handleReset();
    handleCloseDeleteDialog();
    dispatch(fetchUserInfo());
  }

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ pb: 1 }}>
          Xóa lớp học
        </DialogTitle>

        <DialogContent>
          {renderLoading()}
          {renderError()}

          <DialogContentText
            sx={{ color: "inherit", mt: 1 }}
            id="alert-dialog-description"
          >
            Lớp học {classInfo.name} sẽ bị xóa vĩnh viễn. Bạn có chắc chắn muốn
            xóa lớp học này?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: "0 24px 20px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseDeleteDialog}
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

export default DialogDeleteClassroom;
