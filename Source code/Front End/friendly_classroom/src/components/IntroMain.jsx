import React from "react";
import { Link } from "react-router-dom";

export default function IntroMain() {
  return (
    <section className="intro-main container" id="IntroMain">
      <div className="left">
        <h1 className="title">
          Nền tảng lớp học trực tuyến <br /> hiệu quả và phổ biến
        </h1>
        <p className="des">
          Năm 2021, đối mặt với dịch Covid, việc học trực tuyến ngày càng đóng
          vai trò quan trọng trong nền giáo dục. Friendly CLass ra đời với sự
          mệnh giải quyết những vấn đề trong việc học và dạy.
        </p>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="btn btn-join">
            <i className="fa fa-hand-pointer"></i>
            Tham gia ngay
          </button>
        </Link>
      </div>
      <div className="right">
        <img
          src="/assets/img/intro_study.png"
          className="img-study"
          alt="img-study-intro"
        />
      </div>
    </section>
  );
}
