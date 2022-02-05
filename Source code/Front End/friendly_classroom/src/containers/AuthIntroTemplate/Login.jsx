import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, Redirect } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLogin } from "../../redux/modules/Login/action";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";

const theme = createTheme();

function Login() {
  const location = useLocation();

  let direct = null;
  if (location.state && location.state.from) {
    direct = location.state.from.pathname + location.state.from.search;
  }

  // kiểm tra điều kiện các trường đăng nhập với mỗi dữ kiện tương ứng
  const [emptyUsernameNotice, setEmptyUsernameNotice] = useState(false);
  const [emptyPasswordNotice, setEmptyPasswordNotice] = useState(false);
  const [emptyFieldNotice, setEmptyFieldNotice] = useState(false);

  const data = useSelector((state) => state.loginReducer.data);
  const loading = useSelector((state) => state.loginReducer.loading);
  const err = useSelector((state) => state.loginReducer.err);

  const [render, setRender] = useState(false);
  const dispatch = useDispatch();

  // state để dispatch tới action Login
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setTimeout(handleReset, 1000);
    setState({
      username: "",
      password: "",
    });
    // eslint-disable-next-line
  }, [render]);

  const handleReset = () => {
    dispatch(resetLogin());
  };

  // sự kiện thay đổi giá trị của các trường đăng nhập
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });

    if (state.username !== "") {
      setEmptyUsernameNotice(false);
    }
    if (state.password !== "") {
      setEmptyPasswordNotice(false);
    }
    if (state.username !== "" && state.password !== "") {
      setEmptyFieldNotice(false);
    }
  };

  const handleValidationUsername = () => {
    if (state.username === "") {
      setEmptyUsernameNotice(true);
    }
  };

  const handleValidationPassword = () => {
    if (state.password === "") {
      setEmptyPasswordNotice(true);
    }
  };

  // hàm thông báo lỗi khi nhập sai giá trị ở các trường đăng nhập tương ứng
  const renderNotice = () => {
    if (emptyFieldNotice) {
      setTimeout(() => setEmptyFieldNotice(false), 1000);
      return <Alert severity="error">Vui lòng nhập đầy đủ thông tin</Alert>;
    }
    if (emptyUsernameNotice) {
      setTimeout(() => setEmptyUsernameNotice(false), 1000);
      return <Alert severity="error">Tên đăng nhập không được để trống</Alert>;
    }
    if (emptyPasswordNotice) {
      setTimeout(() => setEmptyPasswordNotice(false), 1000);
      return <Alert severity="error">Mật khẩu không được để trống</Alert>;
    }
    if (err) {
      return <Alert severity="error">{err?.response.data.message}</Alert>;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (data) {
    console.log("direct", direct);
    // return direct ? <Redirect to={direct} /> : <Redirect to="/home" />;
    return <Redirect to="/home" />;
  }

  // sự kiện submit form đăng nhập
  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.username === "" || state.password === "") {
      setEmptyFieldNotice(true);
      return;
    }

    dispatch(loginUser(state));
    setRender(!render);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        id="login"
        style={{
          maxWidth: "1120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="mx-auto"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid item xs={12} md={6}>
          <Box
            mx={6}
            my={6}
            sx={{
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
              Đăng nhập
            </Typography>

            {renderNotice()}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tên đăng nhập"
                type="text"
                name="username"
                autoComplete="current-username"
                onChange={handleChange}
                onBlur={handleValidationUsername}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleValidationPassword}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ tên tài khoản"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <a
                    href="#login"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    Quên mật khẩu?
                  </a>
                </Grid>
                <Grid item>
                  <Link
                    to={"/register"}
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    {"Chưa có tài khoản? Đăng ký ngay"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={false} md={6}>
          <img
            src="/assets/img/intro_login.svg"
            alt="intro"
            style={{
              width: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
            }}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
