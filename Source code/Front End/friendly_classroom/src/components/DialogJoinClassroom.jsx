import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserInfo,
  joinClassroom,
  resetJoinClassroom,
} from "../redux/modules/Home/action";

function DialogJoinClassroom(props) {
  const { openJoinDialog, handleCloseJoinDialog } = props;

  const [emptyCodeNotice, setEmptyCodeNotice] = useState(false);

  const inputCode = useRef(null);

  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  const data = useSelector((state) => state.joinClassroomReducer.data);
  const loading = useSelector((state) => state.joinClassroomReducer.loading);
  const err = useSelector((state) => state.joinClassroomReducer.err);

  // state để dispatch tới action Login
  const [state, setState] = useState({
    code: "",
  });

  useEffect(() => {
    setState({
      code: "",
    });
    // eslint-disable-next-line
  }, [render]);

  // sự kiện thay đổi giá trị của các trường đăng nhập
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleValidationCode = () => {
    if (state.code === "") {
      setEmptyCodeNotice(true);
    }
  };

  // hàm thông báo lỗi khi nhập sai giá trị ở các trường đăng nhập tương ứng
  const renderNotice = () => {
    if (emptyCodeNotice) {
      setTimeout(() => setEmptyCodeNotice(false), 1000);
      return <Alert severity="error">Mã môn học không được để trống</Alert>;
    }
    if (err) {
      setTimeout(handleReset, 1000);
      handleClearInput();
      return <Alert severity="error">{err?.response.data.message}</Alert>;
    }
  };

  const handleClearInput = () => {
    if (inputCode.current) inputCode.current.value = "";
  };

  // sự kiện submit form đăng nhập
  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.code === "") {
      // setEmptyFieldNotice(true);
      setEmptyCodeNotice(true);
      return;
    }

    dispatch(joinClassroom(state));
    setRender(!render);
  };

  const handleReset = () => {
    dispatch(resetJoinClassroom());
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

  if (data) {
    alert("Tham gia lớp học thành công");
    handleReset();
    handleCloseJoinDialog();
    dispatch(fetchUserInfo());
  }

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openJoinDialog}
        onClose={handleCloseJoinDialog}
      >
        <DialogTitle sx={{ pb: 0 }}>Tham gia lớp học</DialogTitle>

        <DialogContent>
          {renderLoading()}
          {renderNotice()}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              inputRef={inputCode}
              margin="normal"
              required
              fullWidth
              name="code"
              label="Mã lớp học"
              type="text"
              id="code"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleValidationCode}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "0 24px 20px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseJoinDialog}
          >
            Hủy
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Tham gia
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogJoinClassroom;
