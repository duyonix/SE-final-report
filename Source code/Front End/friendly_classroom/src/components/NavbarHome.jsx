import * as React from "react";
import Navbar from "./Navbar";

const NavbarHome = () => {
  const pages = [
    {
      name: "Trang chủ",
      route: "/home",
    },
    {
      name: "Lịch",
      route: "/calendar",
    },
    {
      name: "Việc cần làm",
      route: "/todo-list",
    },
    {
      name: "Tài khoản",
      route: "/user-account",
    },
  ];

  return <Navbar pages={pages} />;
};

export default NavbarHome;
