import React, { useState, useEffect } from "react";
import { pathImgFromIndex } from "../../utils/constants";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/modules/Home/action";
import {
  changeAvatar,
  resetAvatar,
} from "../../redux/modules/UserAccount/action";

import Loading from "../../components/Loading";

function UserAccount() {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (submit === true) {
      setSubmitting(true);
      setSubmit(false);
      setPreview(null);
      dispatch(changeAvatar(avatar));
    }
    //eslint-disable-next-line
  }, [submit]);
  const changeAvaSuccess = useSelector(
    (state) => state.changeAvatarReducer?.data
  );
  useEffect(() => {
    if (avatar !== null) {
      const objectUrl = URL.createObjectURL(avatar);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    //eslint-disable-next-line
  }, [avatar]);
  useEffect(() => {
    dispatch(fetchUserInfo());
    //eslint-disable-next-line
  }, []);
  const initialField = {
    username: "Username",
    name: "Họ tên",
    email: "Email",
    phone: "Số điện thoại",
    dayCreated: "Ngày tạo",
    numsClass: "Tổng số lớp học tham gia",
    numsTeacher: "Vai trò giáo viên",
    numsStudent: "Vai trò học sinh",
  };

  const data = useSelector((state) => state.fetchUserInfoReducer?.data);
  const user = data?.user;
  const loading = useSelector((state) => state.fetchUserInfoReducer.loading);
  //const err = useSelector((state) => state.fetchUserInfoReducer.err);

  if (changeAvaSuccess) {
    dispatch(resetAvatar());
    dispatch(fetchUserInfo());
    localStorage.removeItem("avatar");
    //localStorage.setItem("avatar", user.avatarUrl);
    setSubmitting(false);
    setAvatar(null);
    window.location.reload(false);
  }
  const convertDate = (date) => {
    date = new Date(date);
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  };
  if (loading || submitting) {
    return <Loading />;
  }
  const onFilesChange = (event) => {
    if (event.target.files[0] !== undefined) {
      setAvatar(event.target.files[0]);
    }
  };
  const handleChangeAvatar = () => {
    setSubmit(true);
  };
  return (
    <div className="container">
      {/* <NavbarHome /> */}

      <div className="user-account ">
        <div className="avatar-area">
          <div className="avatar" title="Change Avatar" id="change-avatar">
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={onFilesChange}
              onClick={(event) => {
                event.currentTarget.value = null;
              }}
            />
            <label
              htmlFor="contained-button-file"
              style={{
                cursor: "pointer",
              }}
            >
              <img
                src={
                  preview !== null
                    ? preview
                    : user?.avatarUrl !== null
                    ? user?.avatarUrl
                    : pathImgFromIndex + "meo_ngu_ngoc.jpg"
                }
                alt="avatar"
                width="150"
                height="150"
                className="avatar"
              ></img>
            </label>
          </div>
          {preview ? (
            <button
              className="btn btn-primary btn-changeAvatar"
              onClick={handleChangeAvatar}
            >
              Change
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="info">
          <h2 className="username">{user?.username}</h2>
          <hr className="shareHr" />
          <div className="infoline">
            <div className="field-container">
              <h4 className="field">{initialField.name}</h4>

              <h4 className="field">{initialField.email}</h4>
              <h4 className="field">{initialField.phone}</h4>
              <h4 className="field">{initialField.dayCreated}</h4>
              <h4 className="field">{initialField.numsClass}</h4>
              <h4 className="field">{initialField.numsTeacher}</h4>
              <h4 className="field">{initialField.numsStudent}</h4>
            </div>
            <div className="value-container">
              <h4 className="value-field">{user?.fullName}</h4>

              <h4 className="value-field">{user?.email}</h4>
              <h4 className="value-field">{user?.phoneNumber}</h4>
              <h4 className="value-field">{convertDate(user?.createdAt)}</h4>
              <h4 className="value-field">
                {user &&
                  Number(
                    user?.classStudent?.length + user?.classTeacher?.length
                  )}
              </h4>
              <h4 className="value-field">{user?.classTeacher.length}</h4>
              <h4 className="value-field">{user?.classStudent.length}</h4>
            </div>
            <div className="button-edit-info">
              <div>
                <IconButton id="nameButton">
                  <EditIcon fontSize="small" />
                </IconButton>
              </div>
              <div>
                <IconButton id="nameButton2">
                  <EditIcon />
                </IconButton>
              </div>
              <div>
                <IconButton id="nameButton3">
                  <EditIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
