import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import VerticalListHomework from "./VerticalListHomework";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchDocumentList,
  actFetchHomeworkList,
} from "../redux/modules/Homework/action";
import Loading from "./Loading";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
const useStyles = makeStyles({
  label: {
    fontSize: 18,
  },
});

export default function ListHomework() {
  const [value, setValue] = React.useState("homework");
  const classes = useStyles();
  let id = null;
  if (localStorage.getItem("classroomId")) {
    id = localStorage.getItem("classroomId");
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchHomeworkList(id));
    dispatch(actFetchDocumentList(id));
    // eslint-disable-next-line
  }, []);
  const dataHomework = useSelector((state) => state.homeworkReducer?.data);
  const loadingHomework = useSelector(
    (state) => state.homeworkReducer?.loading
  );
  const errHomework = useSelector((state) => state.homeworkReducer?.err);
  const keyHomework = useSelector((state) => state.homeworkReducer?.key);

  const dataDocument = useSelector((state) => state.documentReducer?.data);
  const loadingDocument = useSelector(
    (state) => state.documentReducer?.loading
  );
  const errDocument = useSelector((state) => state.documentReducer?.err);
  const keyDocument = useSelector((state) => state.documentReducer?.key);

  if (loadingHomework || loadingDocument) {
    return <Loading />;
  }
  if (errHomework) {
    console.log(errHomework);
  }
  if (errDocument) {
    console.log(errDocument);
  }

  return (
    <div className="list-homework">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box>
            <TabList centered onChange={handleChange}>
              <Tab
                label="Danh sách bài tập"
                className={classes.label}
                value="homework"
              />
              <Tab
                className={classes.label}
                label="Danh sách tài liệu"
                value="document"
              />
            </TabList>
          </Box>

          <TabPanel value="homework">
            {dataHomework?.length === 0 ? (
              <h3 className="notification-nothing">
                <NotInterestedIcon
                  fontSize="large"
                  style={{ color: "red", marginRight: 10 }}
                />
                Hiện không có bài tập nào!
              </h3>
            ) : (
              <VerticalListHomework
                type={"Homework"}
                listHomework={dataHomework}
                keySearch={keyHomework}
              />
            )}
          </TabPanel>

          <TabPanel value="document">
            {dataHomework?.length === 0 ? (
              <h3 className="notification-nothing">
                <NotInterestedIcon
                  fontSize="large"
                  style={{ color: "red", marginRight: 10 }}
                />
                Hiện không có tài liệu nào!
              </h3>
            ) : (
              <VerticalListHomework
                type={"Document"}
                listHomework={dataDocument}
                keySearch={keyDocument}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
