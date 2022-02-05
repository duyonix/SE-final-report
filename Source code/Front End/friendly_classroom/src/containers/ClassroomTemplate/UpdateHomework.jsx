import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DateTimePicker from "@mui/lab/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import Files from "react-files";
import DeleteIcon from "@mui/icons-material/Delete";
import { pathImgFromIndex } from "../../utils/constants";
import { Link, Redirect, useParams } from "react-router-dom";
import {
  updateHomework,
  resetUpdateHomework,
  updateHomeworkFile,
  resetUpdateHomeworkFile,
} from "../../redux/modules/UpdateHomeworkDocument/action";
import { actFetchHomeworkDetailList } from "../../redux/modules/Homework/action";
import Loading from "../../components/Loading";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { useHistory } from "react-router-dom";

function UpdateHomework() {
  const classInfo = JSON.parse(localStorage.getItem("classInfo"));
  const { classroomId, homeworkId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  const dataFetch = useSelector((state) => state.homeworkDetailReducer.data);
  const loadingFetch = useSelector(
    (state) => state.homeworkDetailReducer.loading
  );
  const errFetch = useSelector((state) => state.homeworkDetailReducer.err);

  const [getDataFetch, setGetDataFetch] = useState(false);

  const dataInfo = useSelector((state) => state.updateHomeworkReducer.data);
  const loadingInfo = useSelector(
    (state) => state.updateHomeworkReducer.loading
  );
  const errInfo = useSelector((state) => state.updateHomeworkReducer.err);

  const dataFile = useSelector((state) => state.updateHomeworkFileReducer.data);
  const loadingFile = useSelector(
    (state) => state.updateHomeworkFileReducer.loading
  );
  const errFile = useSelector((state) => state.updateHomeworkFileReducer.err);

  const [fileChange, setFileChange] = useState(false);
  const [stateInfoChange, setStateInfoChange] = useState(false);

  const [state, setState] = useState({
    title: "",
    description: "",
    deadline: new Date(new Date().setHours(24, 0, 0, 0)),
    file: null,
    topic: "Không có chủ đề",
  });

  useEffect(() => {
    dispatch(actFetchHomeworkDetailList(homeworkId));
    setGetDataFetch(true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // No file upload in this homework
    if (dataFetch?.homework.fileAttributes.length === 0) {
      setState({
        title: dataFetch?.homework?.title,
        description: dataFetch?.homework?.description,
        deadline: dataFetch?.homework?.deadline,
        file: null,
        topic: dataFetch?.homework?.topic,
      });
    }
    // Have file upload in this homework
    else {
      setState({
        title: dataFetch?.homework?.title,
        description: dataFetch?.homework?.description,
        deadline: dataFetch?.homework?.deadline,
        file: {
          name: dataFetch?.homework?.fileAttributes[0].name,
          // wait BE update the DB for file, now just default those both are null
          sizeReadable: dataFetch?.homework?.fileAttributes[0].size,
          extension: dataFetch?.homework?.fileAttributes[0].extension,
          lastModified: dataFetch?.homework?.updatedAt,
        },
        topic: dataFetch?.homework?.topic,
      });
    }
    // eslint-disable-next-line
  }, [render, getDataFetch]);

  // console.log("dataFetch", dataFetch);
  // console.log("state", state);
  // console.log("fileChange", fileChange);
  // console.log("stateInfoChange", stateInfoChange);

  const [emptyTitleNotice, setEmptyTitleNotice] = useState(false);
  // const [emptyDeadlineNotice, setEmptyDeadlineNotice] = useState(false);
  const [emptyTopicNotice, setEmptyTopicNotice] = useState(false);
  const [validateFileNotice, setValidateFileNotice] = useState(false);
  const [emptyFieldNotice, setEmptyFieldNotice] = useState(false);
  const [updateNotice, setUpdateNotice] = useState(false);

  const rawTopic = useSelector((state) => state.homeworkReducer.data);

  // get Topic list
  const allTopics = rawTopic?.map((item) => {
    return {
      value: item.topic,
      label: item.topic,
    };
  });

  const format2Digits = (n) => {
    return n < 10 ? "0" + n : n;
  };

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

  const handleChange = (e) => {
    // console.log("change", e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
    if (!stateInfoChange) setStateInfoChange(true);
  };

  const handleFileChange = (files) => {
    if (!fileChange) setFileChange(true);
    if (files[0] !== undefined) setState({ ...state, file: files[0] });
    // console.log(files[0]);
    // if drag directory
    if (files[0] !== undefined && files[0].type === "") {
      setState({ ...state, file: null });
      alert("Vui lòng chỉ nộp 1 tệp. Nếu muốn nộp thư mục, hãy nén lại!");
    }
  };

  const handleFileError = (error) => {
    console.log("error code " + error.code + ": " + error.message);
    setState({ ...state, file: null });
    if (error.code === 2) {
      setValidateFileNotice(true);
    }
  };

  const handleFileDelete = () => {
    if (!fileChange) setFileChange(true);
    setState({ ...state, file: null });
  };

  const handleDeadlineChange = (date) => {
    // console.log("deadline", date);
    if (date === null || date === "Invalid Date") {
      setState({ ...state, deadline: null });
    } else {
      setState({ ...state, deadline: date });
    }
    if (!stateInfoChange) setStateInfoChange(true);
  };

  const handleTopicChange = (field) => {
    // console.log("topic", field);
    if (field === null) {
      setState({ ...state, topic: null });
    } else {
      setState({ ...state, topic: field.value });
    }
    if (!stateInfoChange) setStateInfoChange(true);
  };

  const handleValidationTitle = () => {
    if (state.title === "") {
      setEmptyTitleNotice(true);
    }
  };

  // const handleDeadlineError = () => {
  //   setEmptyDeadlineNotice(true);
  // };

  const handleValidationTopic = () => {
    if (state.topic === null) {
      setEmptyTopicNotice(true);
    }
  };

  const renderNotice = () => {
    if (emptyFieldNotice) {
      setTimeout(() => setEmptyFieldNotice(false), 1000);
      return (
        <Alert severity="error">
          Vui lòng điền đầy đủ tiêu đề, hạn nộp và chủ đề bài tập
        </Alert>
      );
    }
    if (emptyTitleNotice) {
      setTimeout(() => setEmptyTitleNotice(false), 1000);
      return <Alert severity="error">Tiêu đề không được để trống</Alert>;
    }
    // if (emptyDeadlineNotice) {
    //   setTimeout(() => setEmptyDeadlineNotice(false), 1000);
    //   return (
    //     <Alert severity="error">
    //       Hạn nộp không được để trống hoặc sai định dạng
    //     </Alert>
    //   );
    // }
    if (emptyTopicNotice) {
      setTimeout(() => setEmptyTopicNotice(false), 1000);
      return <Alert severity="error">Chủ đề không được để trống</Alert>;
    }
    if (validateFileNotice) {
      setTimeout(() => setValidateFileNotice(false), 1000);
      return (
        <Alert severity="error">
          Kích thước tệp vượt quá 20MB. Vui lòng thử lại hoặc nén file!
        </Alert>
      );
    }
    if (updateNotice) {
      setTimeout(() => setUpdateNotice(false), 1000);
      return (
        <Alert severity="error">
          Bạn chưa thay đổi thông tin nào của bài tập
        </Alert>
      );
    }
    if (errInfo) {
      setTimeout(handleReset, 1000);
      return <Alert severity="error">{errInfo?.response.data.message}</Alert>;
    }
    if (errFile) {
      setTimeout(handleReset, 1000);
      return <Alert severity="error">{errFile?.response.data.message}</Alert>;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // empty required field
    if (state.title === "" || state.deadline === null || state.topic === null) {
      setEmptyFieldNotice(true);
      return;
    }

    // don't change anything
    if (!stateInfoChange && !fileChange) {
      setUpdateNotice(true);
      return;
    }

    // change info
    if (stateInfoChange) {
      const valueDispatch = {
        homeworkId: homeworkId,
        title: state.title,
        description: state.description,
        deadline: state.deadline,
        topic: state.topic,
      };
      dispatch(updateHomework(valueDispatch));
    }

    // change file
    if (fileChange) {
      const formData = new FormData();
      formData.append("homeworkId", homeworkId);
      formData.append("file", state.file);
      dispatch(updateHomeworkFile(formData));
    }

    setRender(!render);
  };

  const handleReset = () => {
    if (stateInfoChange) {
      dispatch(resetUpdateHomework());
    }
    if (fileChange) {
      dispatch(resetUpdateHomeworkFile());
    }
    setStateInfoChange(false);
    setFileChange(false);
  };

  if (loadingFetch || loadingInfo || loadingFile) {
    return <Loading />;
  }

  if (dataFetch && getDataFetch) {
    setGetDataFetch(false);
  }

  if (errFetch) {
    console.log(errFetch);
  }

  if (stateInfoChange && fileChange) {
    // change both info and file of homework
    if (dataInfo && dataFile) {
      // alert("Chỉnh sửa thông tin và file đính kèm của bài tập thành công!");
      setTimeout(handleReset, 1000);
      return (
        <Redirect
          to={{
            pathname: `/classroom/${classroomId}/homework`,
            state: {
              reason:
                "Chỉnh sửa thông tin và file đính kèm của bài tập thành công!",
            },
          }}
        />
      );
    }
  } else if (stateInfoChange) {
    // just only change info of homework without file
    if (dataInfo) {
      // alert("Chỉnh sửa thông tin của bài tập thành công!");
      setTimeout(handleReset, 1000);
      return (
        <Redirect
          to={{
            pathname: `/classroom/${classroomId}/homework`,
            state: { reason: "Chỉnh sửa thông tin của bài tập thành công!" },
          }}
        />
      );
    }
  } else if (fileChange) {
    // just only change file of homework without info
    if (dataFile) {
      // alert("Chỉnh sửa file đính kèm của bài tập thành công!");
      setTimeout(handleReset, 1000);
      return (
        <Redirect
          to={{
            pathname: `/classroom/${classroomId}/homework`,
            state: {
              reason: "Chỉnh sửa file đính kèm của bài tập thành công!",
            },
          }}
        />
      );
    }
  }

  return (
    <section className="update-homework container">
      <div className="header">
        <Link
          to={{ pathname: `/classroom/${classroomId}/stream` }}
          style={{ textDecoration: "none" }}
        >
          <div className="classroom-name">{classInfo.name}</div>
        </Link>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            className="btn-add"
            onClick={() => history.goBack()}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            className="btn-add"
            onClick={handleSubmit}
          >
            Lưu thay đổi
          </Button>
        </Stack>
      </div>

      <Box className="box-notice">{renderNotice()}</Box>

      <Box className="content" component="form" noValidate>
        <div className="row">
          <div className="col-md-9 left">
            <Box className="input-box">
              <TitleIcon
                fontSize="large"
                color="action"
                className="icon-input"
              />
              <TextField
                variant="filled"
                // inputRef={inputName}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Tiêu đề"
                type="text"
                name="title"
                autoComplete="off"
                defaultValue={dataFetch?.homework?.title}
                onChange={handleChange}
                onBlur={handleValidationTitle}
              />
            </Box>
            <Box className="input-box">
              <DescriptionIcon
                fontSize="large"
                color="action"
                className="icon-input"
              />
              <TextField
                variant="filled"
                // inputRef={inputName}
                margin="normal"
                // required
                fullWidth
                id="description"
                label="Mô tả nội dung"
                type="text"
                name="description"
                autoComplete="off"
                multiline
                defaultValue={dataFetch?.homework?.description}
                minRows={5}
                onChange={handleChange}
                // onBlur={handleValidationName}
              />
            </Box>
            <Box
              className="input-box"
              style={{ alignItems: "flex-start", marginTop: "1rem" }}
            >
              <AttachFileIcon
                fontSize="large"
                color="action"
                className="icon-input"
              />
              {state.file === null ? (
                <Files
                  enctype="multipart/form-data"
                  className="files-dropzone"
                  onChange={handleFileChange}
                  onError={handleFileError}
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
                  {
                    <div
                      className="drop-zone"
                      style={{
                        border: "2px dashed #bbb",
                        minHeight: 150,
                        padding: "0 10px",
                      }}
                    >
                      <div className="up-arrow"></div>
                      Kéo thả hoặc ấn vào đây để đăng tải file
                    </div>
                  }
                </Files>
              ) : (
                ""
              )}
              <div className="files">
                {state.file !== null ? (
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
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
                              {state.file?.name}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Kích thước: {state.file?.sizeReadable}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Loại: {state.file?.extension}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Đăng tải: {convertDate(state.file?.lastModified)}
                            </h6>
                          </div>
                          <button className="btn btn-delete-file">
                            <DeleteIcon
                              fontSize="large"
                              color="error"
                              onClick={handleFileDelete}
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
            </Box>
          </div>

          <div className="col-md-3 right">
            <Box sx={{ pb: 2 }}>
              <Typography className="input-label">Điểm</Typography>
              <TextField
                variant="outlined"
                id="grade"
                name="grade"
                type="number"
                label="-"
                fullWidth
                defaultValue="10"
                InputProps={{
                  readOnly: true,
                }}
                disabled
              />
            </Box>
            <Box sx={{ pb: 2 }}>
              <Typography className="input-label">Hạn nộp</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  label="-"
                  fullWidth
                  renderInput={(props) => <TextField {...props} />}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  mask="_/__/____ __:__ _M"
                  minDateTime={new Date()}
                  value={state.deadline}
                  onChange={handleDeadlineChange}
                  // onError={handleDeadlineError}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ pb: 2 }}>
              <Typography className="input-label">Chủ đề</Typography>
              <CreatableSelect
                isClearable
                formatCreateLabel={(inputValue) =>
                  "Tạo chủ đề mới: " + inputValue
                }
                defaultValue={{
                  value: dataFetch?.homework?.topic,
                  label: dataFetch?.homework?.topic,
                }}
                placeholder="Chọn chủ đề"
                onChange={handleTopicChange}
                onBlur={handleValidationTopic}
                options={allTopics}
                size="large"
              />
            </Box>
          </div>
        </div>
      </Box>

      <Box className="box-notice-mobile">{renderNotice()}</Box>
      <Stack direction="row" spacing={2} className="box-mobile-add">
        <Button
          variant="contained"
          color="error"
          className="btn-mobile-add"
          onClick={() => history.goBack()}
        >
          Hủy bỏ
        </Button>
        <Button
          variant="contained"
          className="btn-mobile-add"
          onClick={handleSubmit}
        >
          Lưu thay đổi
        </Button>
      </Stack>
    </section>
  );
}

export default UpdateHomework;
