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
import { useParams } from "react-router-dom";
import {
  addScore,
  resetAddScore,
  fetchAllSubmission,
} from "../redux/modules/HomeworkDetail/action";

function DialogUpdateScore(props) {
  const { openUpdateScoreDialog, handleCloseUpdateScoreDialog, submission } =
    props;
  const studentId = submission.studentId._id;

  const { homeworkId } = useParams();

  const [emptyScoreNotice, setEmptyScoreNotice] = useState(false);

  const inputScore = useRef(null);
  const inputComment = useRef(null);

  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  const data = useSelector((state) => state.addScoreReducer.data);
  const loading = useSelector((state) => state.addScoreReducer.loading);
  const err = useSelector((state) => state.addScoreReducer.err);

  // state để dispatch tới action
  const [state, setState] = useState({
    homeworkId,
    studentId,
    score: submission.score,
    comment: submission.comment,
  });

  useEffect(() => {
    setState({
      homeworkId,
      studentId,
      score: submission.score,
      comment: submission.comment,
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

  const handleValidationScore = () => {
    if (state.score === "") {
      setEmptyScoreNotice(true);
    }
  };

  // hàm thông báo lỗi khi nhập sai giá trị ở các trường tương ứng
  const renderNotice = () => {
    if (emptyScoreNotice) {
      setTimeout(() => setEmptyScoreNotice(false), 1000);
      return <Alert severity="error">Điểm số không được để trống</Alert>;
    }
    if (err) {
      handleClearInput();
      setTimeout(handleReset, 1000);
      return <Alert severity="error">{err?.response.data.message}</Alert>;
    }
  };

  const handleClearInput = () => {
    if (inputScore.current) inputScore.current.value = submission.score;
    if (inputComment.current) inputComment.current.value = submission.comment;
  };

  // sự kiện submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.score === "") {
      setEmptyScoreNotice(true);
      return;
    }

    // console.log("state", state);
    dispatch(addScore(state));
    setRender(!render);
  };

  const handleReset = () => {
    dispatch(resetAddScore());
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
    alert("Chấm điểm thành công");
    handleReset();
    handleCloseUpdateScoreDialog();
    dispatch(fetchAllSubmission(homeworkId));
  }

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openUpdateScoreDialog}
        onClose={handleCloseUpdateScoreDialog}
      >
        <DialogTitle sx={{ pb: 0 }}>Chấm điểm bài nộp</DialogTitle>

        <DialogContent>
          {renderLoading()}
          {renderNotice()}

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              inputRef={inputScore}
              margin="normal"
              required
              fullWidth
              id="score"
              label="Điểm số"
              type="number"
              name="score"
              autoComplete="off"
              defaultValue={submission.score}
              onChange={handleChange}
              onBlur={handleValidationScore}
            />
            <TextField
              inputRef={inputComment}
              margin="normal"
              fullWidth
              name="comment"
              label="Nhận xét"
              type="text"
              id="comment"
              autoComplete="off"
              defaultValue={submission.comment}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "0 24px 20px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseUpdateScoreDialog}
          >
            Hủy
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Chấm điểm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogUpdateScore;
