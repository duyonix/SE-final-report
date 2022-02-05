import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { pathImgFromIndex } from "../utils/constants";
import Avatar from "@mui/material/Avatar";

export default function CardMember(props) {
  const student = props.student;
  console.log(student);
  return (
    <Card className="card-member" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Avatar
          alt="Remy Sharp"
          src={pathImgFromIndex + student.img}
          sx={{ width: 100, height: 100 }}
        />
        <CardContent className="content">
          <Typography
            gutterBottom
            className="name"
            variant="h5"
            component="div"
          >
            {student.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="des">
            {student.des}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="id">
            {student.id}
          </Typography>
          <Typography variant="h5" color="text.secondary" className="dept">
            Khoa {student.dept}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
