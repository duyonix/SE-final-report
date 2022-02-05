import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { pathImgFromIndex } from "../../utils/constants";
import Files from "react-files";
import AddIcon from "@mui/icons-material/Add";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { actFetchHomeworkDetailList } from "../../redux/modules/Homework/action";
import {
  actSubmitHomework,
  actFetchSubmission,
  actDeleteSubmission,
  resetSubmitHomework,
  deleteSubmissionReset,
  resetSubmission,
} from "../../redux/modules/SubmitHomework/action";
import { Alert, Box, CircularProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

function SubmitHomework() {
  const { homeworkId, classroomId } = useParams();
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState(false);
  const [submit, setSubmit] = useState(false);

  let userId = null;

  if (localStorage.getItem("User")) {
    userId = JSON.parse(localStorage.getItem("User")).user._id;
  }

  let className = null;
  if (localStorage.getItem("classInfo")) {
    className = JSON.parse(localStorage.getItem("classInfo")).name;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchHomeworkDetailList(homeworkId));
    dispatch(actFetchSubmission(homeworkId, userId));
    // eslint-disable-next-line
  }, []);

  const dataHomework = useSelector(
    (state) => state.homeworkDetailReducer?.data
  );
  const loadingHomework = useSelector(
    (state) => state.homeworkDetailReducer?.loading
  );
  const errHomework = useSelector((state) => state.homeworkDetailReducer?.err);

  const dataSubmitHomework = useSelector(
    (state) => state.submit_homeworkReducer?.data
  );
  const loadingSubmitHomework = useSelector(
    (state) => state.submit_homeworkReducer?.loading
  );
  const errSubmitHomework = useSelector(
    (state) => state.submit_homeworkReducer?.err
  );

  const dataSubmission = useSelector((state) => state.submissionReducer?.data);
  const loadingSubmission = useSelector(
    (state) => state.submissionReducer?.loading
  );

  const datadeleteSubmission = useSelector(
    (state) => state.submissionDeleteReducer?.data
  );
  const loadingdeleteSubmission = useSelector(
    (state) => state.submissionDeleteReducer?.loading
  );
  const errdeleteSubmission = useSelector(
    (state) => state.submissionDeleteReducer?.err
  );
  useEffect(() => {
    // it works exactly
    if (dataSubmitHomework) {
      setFile(null);
      setCheck(false);
      setSubmit(false);
      dispatch(actFetchSubmission(homeworkId, userId));
      dispatch(resetSubmitHomework());
      dispatch(resetSubmission());
    }
    // eslint-disable-next-line
  }, [dataSubmitHomework]);
  if (loadingHomework) {
    return <Loading />;
  }
  if (errHomework) {
    console.log(errHomework);
  }

  const onFilesChange = (files) => {
    if (files[0] !== undefined) setFile(files[0]);
    // if drag directory
    if (files[0] !== undefined && files[0].type === "") {
      setFile(null);
      alert("Vui lòng chỉ nộp 1 tệp. Nếu muốn nộp thư mục, hãy nén lại!");
    }
  };
  const onFilesError = (error) => {
    console.log("error code " + error.code + ": " + error.message);
    setFile(null);
    if (error.code === 2) {
      alert("Kích thước tệp vượt quá 20MB. Vui lòng thử lại hoặc nén file!");
    }
  };

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
  const handleDeleteFile = () => {
    setFile(null);
    setSubmit(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    if (check) {
      dispatch(actSubmitHomework(userId, file, homeworkId));
    }
  };

  const renderLoadingSubmit = () => {
    if (loadingSubmitHomework) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
  };
  const renderLoadingSubmisson = () => {
    if (loadingSubmission || loadingdeleteSubmission) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
  };
  const renderErrorSubmit = () => {
    if (errSubmitHomework) {
      return (
        <Alert severity="error">
          {errSubmitHomework.response?.data.message}
        </Alert>
      );
    }
  };

  const renderErrorDeleteSubmission = () => {
    if (errdeleteSubmission) {
      return (
        <Alert severity="error">
          {errdeleteSubmission.response?.data.message}
        </Alert>
      );
    }
  };

  //console.log(dataHomework);
  const convertOnlyDate = (date) => {
    date = new Date(date);
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  };
  const handleDeleteSubmission = (e) => {
    dispatch(actDeleteSubmission(homeworkId));
  };
  if (datadeleteSubmission) {
    dispatch(actFetchSubmission(homeworkId, userId));
    dispatch(deleteSubmissionReset());
  }

  return (
    <div className="submit-homework container">
      <div className="logo-class">
        <Link to={{ pathname: `/classroom/${classroomId}/stream` }}>
          <div className="classname">{className}</div>
        </Link>
      </div>
      <div className="content">
        <div className="homework-detail">
          <img
            src={pathImgFromIndex + "homework_icon.png"}
            alt="homework-icon"
            height="100"
          />
          <div className="detail">
            <h3 className="name">{dataHomework?.homework.title}</h3>
            <div className="sub-detail">
              <p>
                <span>Ngày đăng:</span>{" "}
                {convertOnlyDate(dataHomework?.homework.createdAt)}
              </p>
              <p>
                <span> Đến hạn:</span>{" "}
                {convertOnlyDate(dataHomework?.homework.deadline)}
              </p>
            </div>
            <p style={{ marginTop: 10 }}>
              {dataHomework?.homework.description}
            </p>
          </div>
        </div>
        <div className="submit">
          <div className="header" style={{ marginBottom: 10 }}>
            <span>Bài tập của bạn</span>
            {dataSubmission?.submission.markDone !== true ? (
              <span className="status incomplete">{"Chưa nộp bài"}</span>
            ) : (
              <span className="status complete">{"Đã nộp"}</span>
            )}
          </div>
          {renderLoadingSubmisson()}
          {renderErrorDeleteSubmission()}
          {dataSubmission?.submission.markDone ? (
            <div
              className="card"
              style={{
                width: "100%",
                borderRadius: 10,
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                marginBottom: 20,
                marginTop: dataSubmission?.submission !== null ? 20 : 0,
              }}
            >
              <div className="card-body d-flex p-3 file-info">
                <img
                  src={pathImgFromIndex + "file.png"}
                  alt="file img"
                  height="100"
                  style={{ marginRight: 20, marginLeft: -20 }}
                />
                <div className="info-file-block" style={{ width: "80%" }}>
                  <div className="info d-flex justify-content-between">
                    <div
                      className="left"
                      style={{
                        width: "80%",
                      }}
                    >
                      <h5
                        className="card-title"
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {dataSubmission?.submission?.fileAttributes[0].name}
                      </h5>

                      <h6 className="card-subtitle mb-2 text-muted">
                        Loại:{" "}
                        {
                          dataSubmission?.submission?.fileAttributes[0]
                            .extension
                        }
                      </h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Kích thước:{" "}
                        {dataSubmission?.submission?.fileAttributes[0].size}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Nộp lần cuối:
                        {convertDate(dataSubmission?.submission?.updatedAt)}
                      </h6>
                    </div>
                    <button className="btn btn-delete-file">
                      <DeleteIcon
                        fontSize="large"
                        color="error"
                        onClick={handleDeleteSubmission}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h4
                style={{
                  textAlign: "right",
                  fontWeight: "normal",
                  fontSize: 16,
                  margin: "10px 0",
                  lineHeight: "25px",
                }}
              >
                Kích thước tối đa: 20MB <br />
                Số lượng file: 1, nếu nhiều file hãy nén lại
              </h4>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Bài làm này do chính tôi thực hiện"
                  checked={check}
                  onClick={() => {
                    setCheck(!check);
                  }}
                />
                {submit === true && !check ? (
                  <span
                    className="warning text-danger"
                    style={{ fontSize: 16, fontWeight: "bold" }}
                  >
                    Bắt buộc phải đánh dấu phần này
                  </span>
                ) : (
                  ""
                )}
              </FormGroup>
              {renderLoadingSubmit()}
              {renderErrorSubmit()}
              {file === null ? (
                <Files
                  enctype="multipart/form-data"
                  className="files-dropzone"
                  onChange={onFilesChange}
                  onError={onFilesError}
                  type="file"
                  multiple={false}
                  maxFiles={1}
                  maxFileSize={20971520}
                  minFileSize={0}
                  clickable
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button className="btn btn-add">
                    <AddIcon style={{ marginRight: 5 }} />
                    Thêm bài nộp
                  </button>

                  {
                    <div
                      className="drop-zone"
                      style={{
                        border: "2px dashed #bbb",
                        minHeight: 150,
                        margin: "20px 0",
                      }}
                    >
                      <div className="up-arrow"></div>
                      Thả file vào đây để nộp bài
                    </div>
                  }
                </Files>
              ) : (
                ""
              )}
              <div className="files">
                {file !== null ? (
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      marginBottom: 20,
                      marginTop: file !== null ? 20 : 0,
                    }}
                  >
                    <div className="card-body d-flex p-3 file-info">
                      <img
                        src={pathImgFromIndex + "file.png"}
                        alt="file img"
                        height="100"
                        style={{ marginRight: 20, marginLeft: -20 }}
                      />
                      <div className="info-file-block" style={{ width: "80%" }}>
                        <div className="info d-flex justify-content-between">
                          <div
                            className="left"
                            style={{
                              width: "80%",
                            }}
                          >
                            <h5
                              className="card-title"
                              style={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              }}
                            >
                              {file?.name}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Kích thước: {file?.sizeReadable}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Loại: {file?.extension}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Sửa lần cuối: {convertDate(file?.lastModified)}
                            </h6>
                          </div>
                          <button className="btn btn-delete-file">
                            <DeleteIcon
                              fontSize="large"
                              color="error"
                              onClick={handleDeleteFile}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {file !== null ? (
                <button className="btn btn-mark" onClick={handleSubmit}>
                  Nộp bài
                </button>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubmitHomework;
