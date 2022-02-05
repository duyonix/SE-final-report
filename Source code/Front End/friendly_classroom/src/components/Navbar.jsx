import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  Badge,
  CssBaseline,
  Fab,
  Stack,
  useScrollTrigger,
  Zoom,
} from "@mui/material";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { pathImgFromIndex } from "../utils/constants";
import { useSelector } from "react-redux";

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

// Modal Confirm Logout
const style = {
  position: "absolute",
  borderRadius: "10px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: 3,
};

const Navbar = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { pages } = props;
  const settings = ["Đăng xuất"];

  const history = useHistory();

  let avatar = null;

  const data = useSelector((state) => state.fetchUserInfoReducer.data);

  if (localStorage.getItem("avatar")) {
    avatar = localStorage.getItem("avatar");
  } else if (data) {
    localStorage.setItem("avatar", data?.user.avatarUrl);
    avatar = data?.user.avatarUrl;
  } else {
    avatar = pathImgFromIndex + "avatar.png";
  }

  //console.log("avatar", avatar);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openModalLogout, setOpenModalLogout] = useState(false);
  const handleOpenModalLogout = (name) => {
    if (name === "Đăng xuất") {
      handleCloseUserMenu();
      setOpenModalLogout(true);
    }
  };
  const handleCloseModalLogout = () => setOpenModalLogout(false);

  const handleLogout = () => {
    handleCloseModalLogout();
    localStorage.clear();
    history.replace("/");
  };

  const ModalLogout = () => {
    return (
      <Modal
        open={openModalLogout}
        onClose={handleCloseModalLogout}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HelpOutlinedIcon
            sx={{
              color: "#979797",
              fontSize: 100,
              margin: "0 auto",
              textAlign: "center",
            }}
          />
          <Typography
            id="modal-modal-description"
            sx={{
              my: 2,
              textAlign: "center",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Bạn có chắc chắn muốn đăng xuất ?
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              size="large"
              color="error"
              onClick={handleCloseModalLogout}
            >
              Hủy bỏ
            </Button>

            <Button variant="contained" size="large" onClick={handleLogout}>
              Đồng ý
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        className="navbar"
        position="static"
        sx={{ background: "white", position: "sticky", top: 0, opacity: 0.9 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Link to="/home" className="logo">
                <img
                  src={pathImgFromIndex + "Friendly_logo.png"}
                  alt="Our Logo"
                />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                style={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  width: "100%",
                }}
              >
                {pages.map((page, index) => (
                  <NavLink
                    key={index}
                    className="nav-page-link-mobile"
                    exact
                    to={page.route}
                    activeStyle={{ color: "#1e62f5" }}
                  >
                    <MenuItem>
                      <span style={{ margin: "0 auto" }}>{page.name}</span>
                    </MenuItem>
                  </NavLink>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Link to="/home" className="logo">
                <img
                  src={pathImgFromIndex + "Friendly_logo.png"}
                  alt="Our Logo"
                />
              </Link>
            </Typography>
            <Box
              className="nav-page"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              {pages.map((page, index) => (
                <Button key={index} className="nav-page-item">
                  <NavLink
                    exact
                    to={page.route}
                    className="nav-link"
                    activeClassName="nav-link-active"
                  >
                    {page.name}
                  </NavLink>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                className="notification"
                size="large"
                // aria-label="show 17 new notifications"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Tooltip title="Tùy chọn">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "black" }}
                >
                  <Avatar
                    style={{ width: "48px", height: "48px" }}
                    alt="avatar"
                    src={avatar}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleOpenModalLogout(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar style={{ minHeight: 0 }} id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      {ModalLogout()}
    </React.Fragment>
  );
};

export default Navbar;
