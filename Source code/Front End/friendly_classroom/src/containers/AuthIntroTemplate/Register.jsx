import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, Redirect } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  registerUser,
  resetRegister,
} from "../../redux/modules/Register/action";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const theme = createTheme();

function Register() {
  // khởi tạo các state tương ứng để kiểm tra các trường đăng ký
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  // const [isDisable, setIsDisable] = useState(true);
  // const [validEmail, setValidEmail] = useState(false);
  // const [validPhone, setValidPhone] = useState(false);
  const [emptyUsernameNotice, setEmptyUsernameNotice] = useState(false);
  const [emptyPasswordNotice, setEmptyPasswordNotice] = useState(false);
  const [isEmailFormatNotice, setIsEmailFormatNotice] = useState(false);
  const [emptyFullNameNotice, setEmptyFullNameNotice] = useState(false);
  const [isConfirmPasswordNotice, setIsConfirmPasswordNotice] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emptyFieldNotice, setEmptyFieldNotice] = useState(false);
  const [render, setRender] = useState(false);

  // state để dispatch lên action Register
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();

  const err = useSelector((state) => state.registerReducer.err);
  const data = useSelector((state) => state.registerReducer.data);
  const loading = useSelector((state) => state.registerReducer.loading);

  // regex for phoneNumber
  const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  // regex cho email
  const mailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // hàm bắt sự kiện Onchange của các trường đăng ký
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value,
    });

    // console.log("password", state.password);

    if (state.username !== "") {
      setEmptyUsernameNotice(false);
    }
    if (state.password !== "") {
      setEmptyPasswordNotice(false);
    }
    if (state.fullName !== "") {
      setEmptyFullNameNotice(false);
    }
    if (state.email.match(mailFormat) && state.email !== "") {
      setIsEmailFormatNotice(false);
      // setValidEmail(true);
    }
    if (vnf_regex.test(state.phoneNumber) && state.phoneNumber !== "") {
      setIsValidPhoneNumber(false);
      // setValidPhone(true);
    }
    if (
      state.username !== "" &&
      state.password !== "" &&
      state.confirmPassword !== "" &&
      state.fullName !== "" &&
      state.email !== "" &&
      state.phoneNumber !== ""
    ) {
      // setIsDisable(false);
      setEmptyFieldNotice(false);
    }
  };

  const handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // console.log("value", value);
    // console.log("confirmPassword", confirmPassword);

    if (value !== "" && value === state.password) {
      setIsConfirmPasswordNotice(false);
    }
  };

  // hàm kiểm tra điều kiện đúng của phoneNumber bằng regex
  const validationPhoneNumber = () => {
    if (vnf_regex.test(state.phoneNumber) && state.phoneNumber !== "") {
      setIsValidPhoneNumber(false);
      // setValidPhone(true);
    } else {
      setIsValidPhoneNumber(true);
      // setValidPhone(false);
      // setIsDisable(true);
    }
  };

  // các hàm kiểm tra validation cho từng trường dữ liệu
  const handleValidationEmptyUserName = () => {
    if (state.username === "") {
      setEmptyUsernameNotice(true);
    }
  };

  const handleValidationEmptyPassword = () => {
    // console.log("password out", state.password);
    if (state.password === "") {
      setEmptyPasswordNotice(true);
    }
  };

  const handleValidationsConfirmPassword = () => {
    if (confirmPassword === "" || confirmPassword !== state.password) {
      setIsConfirmPasswordNotice(true);
    }
  };

  const handleValidationEmptyFullName = () => {
    if (state.fullName === "") {
      setEmptyFullNameNotice(true);
    }
  };

  const handleValidationEmail = () => {
    if (mailFormat.test(state.email) && state.email !== "") {
      setIsEmailFormatNotice(false);
      // setValidEmail(true);
    } else {
      setIsEmailFormatNotice(true);
      // setValidEmail(false);
      // setIsDisable(true);
    }
  };

  useEffect(() => {
    setTimeout(handleReset, 1500);
    setState({
      username: "",
      password: "",
      email: "",
      fullName: "",
      phoneNumber: "",
    });
    setConfirmPassword("");
    //eslint-disable-next-line
  }, [render]);

  // hàm in ra thông báo lỗi validate tương ứng của các trường khi nhập sai
  const handleValidationNotice = () => {
    if (emptyFieldNotice) {
      setTimeout(() => setEmptyFieldNotice(false), 1500);
      return (
        <Alert severity="error">Vui lòng nhập thông tin đầy đủ và hợp lệ</Alert>
      );
    }
    if (emptyUsernameNotice) {
      setTimeout(() => setEmptyUsernameNotice(false), 1500);
      return <Alert severity="error">Tên đăng nhập không được để trống</Alert>;
    }
    if (emptyPasswordNotice) {
      setTimeout(() => setEmptyPasswordNotice(false), 1500);
      return <Alert severity="error">Mật Khẩu không được để trống</Alert>;
    }
    if (isConfirmPasswordNotice) {
      setTimeout(() => setIsConfirmPasswordNotice(false), 1500);
      return <Alert severity="error">Mật khẩu không trùng khớp</Alert>;
    }
    if (emptyFullNameNotice) {
      setTimeout(() => setEmptyFullNameNotice(false), 1500);
      return <Alert severity="error">Họ Tên không được để trống</Alert>;
    }
    if (isEmailFormatNotice) {
      setTimeout(() => setIsEmailFormatNotice(false), 1500);
      return <Alert severity="error">Không đúng định dạng email</Alert>;
    }
    if (isValidPhoneNumber) {
      setTimeout(() => setIsValidPhoneNumber(false), 1500);
      return <Alert severity="error">Số điện thoại không phù hợp</Alert>;
    }
    if (err) {
      return <Alert severity="error">{err?.response.data.message}</Alert>;
    }
  };

  const handleReset = () => {
    dispatch(resetRegister());
  };

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return <Redirect to="/login" />;
  }

  // hàm Submit đăng ký và truyền dữ liệu lên server
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      state.username === "" ||
      state.password === "" ||
      confirmPassword === "" ||
      confirmPassword !== state.password ||
      state.fullName === "" ||
      state.email === "" ||
      state.phoneNumber === ""
    ) {
      setEmptyFieldNotice(true);
      return;
    }

    // console.log("data", state);
    dispatch(registerUser(state));
    setRender(!render);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img
              src="/assets/img/Friendly_logo.png"
              alt="Friendly"
              style={{
                height: "70px",
                width: "auto",
              }}
            />
          </Link>

          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>

          {handleValidationNotice()}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h6">
                  Thông tin tài khoản
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  type="text"
                  label="Tên đăng nhập"
                  onChange={handleChange}
                  onBlur={handleValidationEmptyUserName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onBlur={handleValidationEmptyPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type="password"
                  id="confirmPassword"
                  onChange={handleChangeConfirmPassword}
                  onBlur={handleValidationsConfirmPassword}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="h6"
                  style={{ marginTop: 10 }}
                >
                  Thông tin cá nhân
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Họ và tên"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  onChange={handleChange}
                  onBlur={handleValidationEmptyFullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleValidationEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Số điện thoại"
                  type="phoneNumber"
                  id="phoneNumber"
                  autoComplete="phoneNumber"
                  onChange={handleChange}
                  onBlur={validationPhoneNumber}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              // disabled={isDisable}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  variant="body2"
                  style={{ textDecoration: "none" }}
                >
                  Đã có tài khoản? Đăng nhập ngay
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
