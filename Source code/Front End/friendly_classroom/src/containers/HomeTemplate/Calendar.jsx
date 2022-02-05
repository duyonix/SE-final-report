import React from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay from "@mui/lab/PickersDay";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfWeek from "date-fns/startOfWeek";
import TimeTable from "react-timetable-events"

import moment from "moment";
import{
  fetchAllCalendar,
} from "../../redux/modules/Calendar/action.js";
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));
function Calendar() {
  const [value, setValue] = React.useState(new Date());

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const events = {
    monday: [
      {
        id: 1,
        name: "BTVN",
        type: "custom",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T13:30:00"),
      },
    ],
    tuesday: [
    ],
    wednesday: [
      {
        id: 7,
        name: "Ôn tập",
        type: "custom",
        startTime: moment("2018-02-23T13:00:00"),
        endTime: moment("2018-02-23T14:30:00"),
      },
      {
        id: 4,
        name: "Kiểm tra",
        type: "custom",
        startTime: moment("2018-02-22T15:00:00"),
        endTime: moment("2018-02-22T16:30:00"),
      },
    ],
    thursday: [
      
    ],
    friday: [
      {
        id: 7,
        name: "Ôn tập",
        type: "error",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T14:30:00"),
      },
      {
        id: 4,
        name: "Thi",
        type: "custom",
        startTime: moment("2018-02-22T14:30:00"),
        endTime: moment("2018-02-22T16:30:00"),
      },
    ],
    saturday: [
      {
        id: 7,
        name: "Bài tập ngắn",
        type: "custom",
        startTime: moment("2018-02-23T07:00:00"),
        endTime: moment("2018-02-23T09:30:00"),
      },
      {
        id: 4,
        name: "Kiểm tra",
        type: "custom",
        startTime: moment("2018-02-22T16:00:00"),
        endTime: moment("2018-02-22T17:30:00"),
      },
    ],
    sunday: [],
  };
  const renderHour = (hour, defaultAttributes, styles) => {
    return (
      <div {...defaultAttributes} key={hour}>
        {hour}
      </div>
    );
  };
  const renderEvent = (event, defaultAttributes, styles) => {
    return (
      <div
        {...defaultAttributes}
        title={event.name}
        key={event.id}
        style={{
          ...defaultAttributes.style,
          borderRadius: "10px",
        }}
      >
        <span className={styles.event_info}> {event.name} </span>
        <span className={styles.event_info}>
          {event.startTime.format("HH:mm")} - {event.endTime.format("HH:mm")}
        </span>
      </div>
    );
   
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCalendar());
  //eslint-disable-next-line
}, []);
  const dataCalendar = useSelector(
    (state) => state.fetchAllCalendarReducer?.data
  );
  console.log(dataCalendar);

  return (
    <div>
      <div className="calendar-container">
        <div className="calender-pick-week">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              label="Week picker"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderDay={renderWeekPickerDay}
              renderInput={(params) => <TextField {...params} />}
              inputFormat="'Week of' MMM d"
            />
          </LocalizationProvider>
        </div>
        <div className="calendar-todo">
            <TimeTable 
              events={events}
              renderHour={renderHour}
              renderEvent={renderEvent}
              hoursInterval={[7, 24]}
              timeLabel=""
            />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
