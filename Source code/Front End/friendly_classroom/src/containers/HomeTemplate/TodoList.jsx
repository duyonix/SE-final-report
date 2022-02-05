import React from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { pathImgFromIndex } from "../../utils/constants";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import moment from "moment";
import{
  fetchAllTodo,
} from "../../redux/modules/Todo/action.js";
const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
          backgroundColor: red,
        },
      },
    },
  },
});

function TodoList() {
  //TODO: load list course
  const currencies = [
    {
      value: "Tất cả các lớp học",
      label: "$",
    },
    {
      value: "Toán 6",
      label: "€",
    },
    {
      value: "Anh 6",
      label: "฿",
    },
    {
      value: "BD Toán 6",
      label: "¥",
    },
  ];
  const [currency, setCurrency] = React.useState("Tất cả các lớp học");
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTodo());
  //eslint-disable-next-line
}, []);
  const dataTodo = useSelector(
    (state) => state.fetchAllTodoReducer?.data
  );
  // const loadingTodo = useSelector(
  //   (state) => state.fetchAllTodoReducer?.loading
  // );
  // const errTodo = useSelector(
  //   (state) => state.fetchAllTodoReducer?.err
  // );
  console.log(dataTodo);
  var now = moment();
  return (
    <div>
      <div className="container-todolist">
        <div className="function-filter">
          <TextField
            id="outlined-select-currency"
            select
            label="."
            value={currency}
            onChange={handleChange}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="groups">
          <div className="card-title-length">
            <ThemeProvider theme={theme}>
              <Card className="card-title" sx={{ minWidth: 300 }}>
                <CardMedia
                  sx={{ maxWidth: 130 }}
                  component="img"
                  height="130"
                  image={pathImgFromIndex + "list.png"}
                />
                <CardContent>
                  <h5>Việc được giao</h5>
                </CardContent>
              </Card>
            </ThemeProvider>
          </div>
          <div className="card-title-length">
            <ThemeProvider theme={theme}>
              <Card className="card-title" sx={{ minWidth: 300 }}>
                <CardMedia
                  sx={{ maxWidth: 130 }}
                  component="img"
                  height="130"
                  image={pathImgFromIndex + "done.png"}
                />
                <CardContent>
                  
                  <h5> Việc hoàn thành</h5>
                </CardContent>
              </Card>
            </ThemeProvider>
          </div>
          <div className="card-title-length">
            <ThemeProvider theme={theme}>
              <Card className="card-title" sx={{ minWidth: 300 }}>
                <CardMedia
                  sx={{ maxWidth: 130 }}
                  component="img"
                  height="130"
                  image={pathImgFromIndex + "fail.png"}
                />
                <CardContent>
                  <h5>Việc quá hạn</h5>
                </CardContent>
              </Card>
            </ThemeProvider>
          </div>
        </div>
        <div className="data-groups">
          <div className="card-content-exercise">
            {dataTodo?.submissions.map((ex) =>
             (
              <div className="card-content-exercise-button">
                {ex?.homeworkId?(<div>
                  {ex?.markDone?(""):(
                <Button
                  className="btn-card-first"
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: 300 }}
                  key={ex?._id}
                >
                  <div>
                    <Typography>{ex?.homeworkId?.classroomId?.name}</Typography>
                    <h6>{ex?.homeworkId?.title}</h6>
                    
                  </div>
                </Button>)}
                </div>):("")}
                
              </div>
            ))}
          </div>
          <div className="card-content-exercise">
          {dataTodo?.submissions.map((ex) => (
              <div className="card-content-exercise-button">
                 {ex?.homeworkId &&ex?.markDone ?(
                 <div>
                  <Button
                
                  className="btn-card"
                  variant="contained"
                  color="success"
                  sx={{ minWidth: 300 }}
                  key={ex?._id}
                >
                  <div>
                    <Typography>{ex?.homeworkId?.classroomId?.name}</Typography>
                    <h6>{ex?.homeworkId?.title}</h6>
                  </div>
                </Button>

                 </div>):("")}
                
              </div>
            ))}
            
          </div>
          
          <div className="card-content-exercise">
          {dataTodo?.submissions.map((ex) => (
              <div className="card-content-exercise-button">
                 {ex?.homeworkId?(<div>
                  {(now>(ex?.homeworkId?.deadline) && ex)?.markDone?(
                  
                  <Button
                  
                    className="btn-card"
                    variant="contained"
                    color="error"
                    sx={{ minWidth: 300 }}
                    key={ex?._id}
                  >
                    <div>
                      <Typography>{ex?.homeworkId?.classroomId?.name}</Typography>
                      <h6>{ex?.homeworkId?.title}</h6>
                    </div>
                  </Button>):("")}

                 </div>):("")}
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
