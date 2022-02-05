import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { pathImgFromIndex } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
 
  actFetchDocumentDetailList,
} from "../redux/modules/Homework/action";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Loading from "./Loading";
function HomeworkCard(props) {
  const { type, homework } = props;
  const { classroomId } = useParams();
  let role;
  if (localStorage.getItem("role")) {
    role = localStorage.getItem("role");
  }
  const dispatch = useDispatch();
  const [more, setMore] = useState(false);
  const [dataDocument, setDataDocument] = useState(null);

  const imgIconCard = type === "Homework" ? "homework_icon" : "document_icon";
  const renderMore = () => {
    if (more === true && data) {
      return (
        <div className="More">
          <p className="desc">{dataDocument?.document.description}</p>
          <a
            title="Tải xuống tài liệu"
            href={dataDocument?.document.attachedFiles[0]}
          >
            <FileDownloadIcon fontSize={"large"} />
          </a>
        </div>
      );
    }
  };
  const showDetailDocument = (document) => {
    return () => {
      dispatch(actFetchDocumentDetailList(document._id));
      setMore(true);
    };
  };

  const data = useSelector((state) => state.documentDetailReducer?.data);
  const loading = useSelector((state) => state.documentDetailReducer?.loading);
  const err = useSelector((state) => state.documentDetailReducer?.err);
  useEffect(() => {
    if (data && data.document._id === homework._id) setDataDocument(data);
    // eslint-disable-next-line
  }, [data]);
  if (loading) {
    return <Loading />;
  }
  if (err) {
    console.log(err.response.data.message);
  }

  const collapseDocument = () => {
    setMore(false);
  };

  const convertDate = (date) => {
    date = new Date(date);
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  };
  return (
    <div className="homework-card">
      <Card style={{ maxWidth: role === "student" ? 600 : 900 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 20px",
            cursor: "default",
          }}
        >
          <CardMedia
            component="img"
            height={type === "Homework" ? "64" : "80"}
            image={pathImgFromIndex + imgIconCard + ".png"}
            alt="homework icon"
            style={{ width: "auto", display: "inline-block" }}
          />
          <div className="info">
            <span className="hw-name">{homework?.title}</span>
            <div className="detail">
              {type === "Homework" ? (
                <span className="hw-deadline">
                  Hạn chót: {convertDate(homework?.deadline)}
                </span>
              ) : (
                <span className="hw-createdAt">
                  Ngày đăng: {convertDate(homework?.createdAt)}
                </span>
              )}

              {/* button change */}
              {role === "teacher" ? (
                type === "Homework" ? (
                  <Link
                    to={{
                      pathname: `/classroom/${classroomId}/homework-detail/${homework?._id}/update`,
                      state: { homework: homework },
                    }}
                  >
                    <button className="btn btn-change">Sửa</button>
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: `/classroom/${classroomId}/document/${homework?._id}/update`,
                      state: { homework: homework },
                    }}
                  >
                    <button className="btn btn-change">Sửa</button>
                  </Link>
                )
              ) : (
                ""
              )}

              {/* button detail */}

              {role === "teacher" ? (
                type === "Homework" ? (
                  <Link
                    to={{
                      pathname: `/classroom/${classroomId}/homework-detail/${homework?._id}`,
                    }}
                  >
                    <button className="btn btn-detail">Chi tiết</button>
                  </Link>
                ) : more === false ? (
                  <button
                    className="btn btn-detail"
                    onClick={showDetailDocument(homework)}
                  >
                    Chi tiết
                  </button>
                ) : (
                  <button className="btn btn-detail" onClick={collapseDocument}>
                    Thu gọn
                  </button>
                )
              ) : type === "Homework" ? (
                <Link
                  to={{
                    pathname:
                      "/classroom/" +
                      classroomId +
                      "/homework/" +
                      homework?._id,
                  }}
                >
                  <button className="btn btn-detail">Chi tiết</button>
                </Link>
              ) : more === false ? (
                <button
                  className="btn btn-detail"
                  onClick={showDetailDocument(homework)}
                >
                  Chi tiết
                </button>
              ) : (
                <button className="btn btn-detail" onClick={collapseDocument}>
                  Thu gọn
                </button>
              )}
            </div>
          </div>
        </Box>
        {renderMore()}
      </Card>
    </div>
  );
}

export default HomeworkCard;
