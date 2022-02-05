import React from "react";
import { Link, NavLink } from "react-router-dom";
export default function NavbarIntro() {
  return (
    <nav id="navbar-intro">
      <div className="container">
        <Link to="/" className="logo">
          <img src="../assets/img/Friendly_logo.png" alt="Our Logo" />
        </Link>
        <nav className="navbar navbar-expand-lg navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#IntroMain">
                  Giới thiệu
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#intro-feature">
                  Tính năng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#about-us">
                  Thành viên
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="navbar-right">
          <div className="account">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="btn btn-signin">Đăng nhập</button>
            </Link>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <button className="btn btn-signup">Đăng ký</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
