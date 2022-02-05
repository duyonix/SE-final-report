import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import {
  actHomeworkSearch,
  actDocumentSearch,
} from "../redux/modules/Homework/action";
import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useParams } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      // padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const AddMenuButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { classroomId } = useParams();

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        sx={{ px: 3, py: 1.3, borderRadius: 10 }}
      >
        Thêm
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link
          to={{ pathname: `/classroom/${classroomId}/assign-homework` }}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem disableRipple>
            <AssignmentIcon size="large" />
            Bài Tập
          </MenuItem>
        </Link>
        <Divider sx={{ my: 0.5 }} />
        <Link
          to={{ pathname: `/classroom/${classroomId}/upload-document` }}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem disableRipple>
            <AssignmentIcon size="large" />
            Tài liệu
          </MenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
};

export default function OperationHomework() {
  let role = null;
  const { classroomId } = useParams();

  const [itemName, setItemName] = useState("");
  if (localStorage.getItem("role")) {
    role = localStorage.getItem("role");
  }
  let className = null;
  if (localStorage.getItem("classInfo")) {
    className = JSON.parse(localStorage.getItem("classInfo")).name;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    passDataSearch();
    // eslint-disable-next-line
  }, [itemName]);

  const passDataSearch = () => {
    dispatch(actHomeworkSearch(itemName));
    dispatch(actDocumentSearch(itemName));
  };
  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "itemName") {
      setItemName(value);
    }
  };

  return (
    <section
      style={{
        justifyContent: role === "teacher" ? "space-between" : "space-around",
      }}
      className="operation-homework container"
    >
      <Link
        to={{ pathname: `/classroom/${classroomId}/stream` }}
        style={{ textDecoration: "none" }}
      >
        <div className="classname">{className}</div>
      </Link>
      <div className="input-group">
        <TextField
          label="Tìm kiếm bài tập hoặc tài liệu"
          placeholder="Nhập tên bài tập hoặc tài liệu"
          name="itemName"
          onChange={handleChange}
        />
        <button type="button" id="idFind" className="btn btn-primary">
          <SearchIcon sx={{ fontSize: 28 }} />
        </button>
      </div>
      {role === "teacher" ? <AddMenuButton>Thêm</AddMenuButton> : ""}
    </section>
  );
}
