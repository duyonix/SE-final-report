import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const NavbarClassroom = () => {
  const { classroomId } = useParams();

  const pages = [
    {
      name: "Bảng tin",
      route: `/classroom/${classroomId}/stream`,
    },
    {
      name: "Bài tập",
      route: `/classroom/${classroomId}/homework`,
    },
    {
      name: "Mọi người",
      route: `/classroom/${classroomId}/member`,
    },
    {
      name: "Điểm số",
      route: `/classroom/${classroomId}/grade`,
    },
  ];

  // console.log("navbar router", props);
  return <Navbar pages={pages} />;
};

export default NavbarClassroom;
