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
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createClassroom,
  fetchUserInfo,
  resetCreateClassroom,
} from "../redux/modules/Home/action";

function DialogCreateClassroom(props) {
  const { openCreateDialog, handleCloseCreateDialog } = props;

  const [emptyNameNotice, setEmptyNameNotice] = useState(false);

  const inputName = useRef(null);
  const inputDescription = useRef(null);

  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  const data = useSelector((state) => state.createClassroomReducer.data);
  const loading = useSelector((state) => state.createClassroomReducer.loading);
  const err = useSelector((state) => state.createClassroomReducer.err);

  // state để dispatch tới action Login
  const [state, setState] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    setState({
      name: "",
      description: "",
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

  const handleValidationName = () => {
    if (state.name === "") {
      setEmptyNameNotice(true);
    }
  };

  // hàm thông báo lỗi khi nhập sai giá trị ở các trường đăng nhập tương ứng
  const renderNotice = () => {
    if (emptyNameNotice) {
      setTimeout(() => setEmptyNameNotice(false), 1000);
      return <Alert severity="error">Tên môn học không được để trống</Alert>;
    }
    if (err) {
      handleClearInput();
      setTimeout(handleReset, 1000);
      return <Alert severity="error">{err?.response.data.message}</Alert>;
    }
  };

  const handleClearInput = () => {
    if (inputName.current) inputName.current.value = "";
    if (inputDescription.current) inputDescription.current.value = "";
  };

  // sự kiện submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.name === "") {
      setEmptyNameNotice(true);
      return;
    }

    dispatch(createClassroom(state));
    setRender(!render);
  };

  const handleReset = () => {
    dispatch(resetCreateClassroom());
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
    alert("Tạo lớp học thành công");
    handleReset();
    handleCloseCreateDialog();
    dispatch(fetchUserInfo());
  }

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
      >
        <DialogTitle sx={{ pb: 0 }}>Tạo lớp học</DialogTitle>

        <DialogContent>
          {renderLoading()}
          {renderNotice()}

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              inputRef={inputName}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Tên lớp học"
              type="text"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleValidationName}
            />
            <TextField
              inputRef={inputDescription}
              margin="normal"
              fullWidth
              name="description"
              label="Mô tả"
              type="text"
              id="Description"
              autoComplete="off"
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "0 24px 20px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseCreateDialog}
          >
            Hủy
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Tạo lớp
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogCreateClassroom;
