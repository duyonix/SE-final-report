import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Avatar, Button, TextField, Box, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { pathImgFromIndex } from "../../utils/constants";
import {
  fetchAllScoreClassroom,
  fetchAllScoreUser,
} from "../../redux/modules/Grade/action";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#A3EBFB",
    color: "#000",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function DataScoreClassroomCell(props) {
  const { data } = props;

  return (
    <StyledTableRow role="checkbox" tabIndex={-1}>
      <StyledTableCell>
        <Avatar
          src={
            data.avatarUrl !== undefined
              ? data.avatarUrl
              : pathImgFromIndex + "avatar.png"
          }
          alt="avatar"
          sx={{ width: 64, height: 64 }}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: 150 }}>{data?.fullName}</StyledTableCell>

      {data?.scores.map((score) => (
        <StyledTableCell align="right" sx={{ minWidth: 150 }}>
          {score !== null ? score : "..."}
        </StyledTableCell>
      ))}
    </StyledTableRow>
  );
}

function DataScoreUserCell(props) {
  const { data } = props;

  return (
    <StyledTableRow role="checkbox" tabIndex={-1}>
      <StyledTableCell>{data.title}</StyledTableCell>
      <StyledTableCell align="right">
        {data.score ? data.score : "..."}
      </StyledTableCell>
    </StyledTableRow>
  );
}

function Grade() {
  const { classroomId } = useParams();
  const classInfo = JSON.parse(localStorage.getItem("classInfo"));

  let role = null;
  if (localStorage.getItem("role")) {
    role = localStorage.getItem("role");
  }

  const [keySearch, setKeySearch] = useState("");

  const searchInput = useRef(null);

  useEffect(() => {
    if (role === "teacher") {
      dispatch(fetchAllScoreClassroom(classroomId));
    } else if (role === "student") {
      dispatch(fetchAllScoreUser(classroomId));
    }
    //eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();

  // teacher role
  const dataScoreClassroom = useSelector(
    (state) => state.fetchAllScoreClassroomReducer?.data
  );
  const loadingScoreClassroom = useSelector(
    (state) => state.fetchAllScoreClassroomReducer?.loading
  );
  const errScoreClassroom = useSelector(
    (state) => state.fetchAllScoreClassroomReducer?.err
  );
  // student role
  const dataScoreUser = useSelector(
    (state) => state.fetchAllScoreUserReducer?.data
  );
  const loadingScoreUser = useSelector(
    (state) => state.fetchAllScoreUserReducer?.loading
  );
  const errScoreUser = useSelector(
    (state) => state.fetchAllScoreUserReducer?.err
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(dataScoreClassroom);
  const renderHeaderScoreClassroom = () => {
    return (
      <TableRow>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell sx={{ minWidth: 150 }}>Họ tên</StyledTableCell>

        {dataScoreClassroom?.arrayHomeworks.map((homework) => (
          <StyledTableCell
            key={homework._id}
            align="right"
            sx={{ minWidth: 150 }}
          >
            <span className="homework-title">{homework.title}</span>
          </StyledTableCell>
        ))}
      </TableRow>
    );
  };

  const isMatch = (s, key) => {
    return s.toLowerCase().indexOf(key.toLowerCase());
  };

  // role teacher
  // filter data by keySearch
  let dataScoreClassroomFilter = [];
  console.log(dataScoreClassroomFilter)
  if (dataScoreClassroom) {
    if (keySearch !== "") {
      dataScoreClassroomFilter = dataScoreClassroom.result.filter(
        (student) => isMatch(student.fullName, keySearch) !== -1
      );
    } else {
      dataScoreClassroomFilter = dataScoreClassroom.result;
    }
  }

  const renderRowScoreClassroom = () => {
    return dataScoreClassroomFilter
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((data) => {
        return <DataScoreClassroomCell data={data} key={data.studentId} />;
      });
  };

  // role student

  // parse data from BE
  let dataParseScoreUser = [];

  if (dataScoreUser) {
    for (let i = 0; i < dataScoreUser.homeworks.length; i++) {
      dataParseScoreUser.push({
        _id: dataScoreUser.homeworks[i]._id,
        title: dataScoreUser.homeworks[i].title,
        score: dataScoreUser.result[i],
      });
    }
  }

  // filter data by keySearch
  let dataScoreUserFilter = [];

  if (keySearch !== "") {
    dataScoreUserFilter = dataParseScoreUser?.filter(
      (homework) => isMatch(homework.title, keySearch) !== -1
    );
  } else {
    dataScoreUserFilter = dataParseScoreUser;
  }

  const renderRowScoreUser = () => {
    return dataScoreUserFilter
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((data) => {
        return <DataScoreUserCell data={data} key={data._id} />;
      });
  };

  if (loadingScoreClassroom || loadingScoreUser) {
    return <Loading />;
  }

  if (errScoreClassroom) {
    console.log(errScoreClassroom);
  }

  if (errScoreUser) {
    console.log(errScoreUser);
  }

  return (
    <div className="grade container">
      <div className="header">
        <Link to={{ pathname: `/classroom/${classroomId}/stream` }}>
          <div className="classroom-name">{classInfo.name}</div>
        </Link>

        <Box className="wrap-search">
          <TextField
            type="search"
            id="input-with-sx"
            label={
              role === "student" ? "Tìm kiếm bài tập" : "Tìm kiếm học sinh"
            }
            placeholder={
              role === "student" ? "Nhập tên bài tập" : "Nhập tên học sinh"
            }
            variant="outlined"
            fullWidth
            inputRef={searchInput}
            onChange={(e) => setKeySearch(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ marginLeft: "-2px", padding: "10px 0" }}
            onClick={() => searchInput.current.focus()}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </Box>
      </div>

      <div className="header-line"></div>

      {role === "student" ? (
        <Grid container className="student" spacing={2}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 480 }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  // sx={{ minWidth: 500 }}
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Bài tập</StyledTableCell>
                      <StyledTableCell align="right">Điểm</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderRowScoreUser()}</TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={dataScoreUserFilter?.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Số dòng:"
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} sx={{ position: "relative" }}>
            <img
              src={pathImgFromIndex + "people_score.png"}
              alt="score"
              style={{
                width: "100%",
                maxHeight: "532px",
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <div className="teacher">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 480 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>{renderHeaderScoreClassroom()}</TableHead>
                <TableBody>{renderRowScoreClassroom()}</TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={dataScoreClassroomFilter?.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Số dòng:"
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
    </div>
  );
}

export default Grade;
