import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { red } from "@mui/material/colors";

export default function Footer() {
  return (
    <section className="footer">
      <div className="container">
        <div className="content row">
          <div className="general div-4 col-sm-12 col-md-4 col-lg-4">
            <Link to="/home" className="logo">
              <img src="/assets/img/Friendly_logo.png" alt="Our Logo" />
            </Link>
            <h3>Lớp học thân thiện - Friendly Classroom </h3>
            <p>&copy;Copyright HiFive Team</p>
          </div>
          <div className="address div-4 col-sm-12 col-md-4 col-lg-4">
            <h3>Địa chỉ</h3>
            <ul>
              <li>Trường Đại học Khoa học tự nhiên</li>
              <li>Khoa Công nghệ thông tin</li>
              <li>19CNTN</li>
            </ul>
          </div>
          <div className="contact div-4 col-sm-12 col-md-4 col-lg-4">
            <h3>Liên hệ</h3>
            <ul className="contact-list">
              <li>
                <a href="https://www.facebook.com/vhvu99">
                  <FacebookIcon fontSize="large" color="primary" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/_hoangvu9/">
                  <InstagramIcon fontSize="large" color="error" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/vhvu99">
                  <TwitterIcon fontSize="large" color="primary" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/vhvu99">
                  <TelegramIcon fontSize="large" color={red[50]} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
