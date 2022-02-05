import React from "react";

export default function IntroFeature() {
  return (
    <section id="intro-feature" className="intro-feature">
      <div className="content container">
        <h1 className="title">Tính năng chính</h1>
        <div className="row">
          <div className="feature-box col-12 col-sm-12 col-md-6">
            <div className="inner">
              <img
                className="img-illus"
                src="/assets/img/intro_func_1.jpg"
                alt="illustration"
              />
              <h3>Dễ dàng quản lý nhiều lớp học, nhiều học sinh</h3>
            </div>
          </div>

          <div className="feature-box col-12 col-sm-12 col-md-6">
            <div className="inner">
              <img
                className="img-illus"
                src="/assets/img/intro_func_2.png"
                alt="illustration"
              />
              <h3>Giao bài tập và quản lý thời hạn nộp bài</h3>
            </div>
          </div>
          <div className="feature-box col-12 col-sm-12 col-md-6">
            <div className="inner">
              <img
                className="img-illus"
                src="/assets/img/intro_func_3.png"
                alt="illustration"
              />
              <h3>Bảo mật tài liệu, nâng cao hiệu quả giảng dạy</h3>
            </div>
          </div>
          <div className="feature-box col-12 col-sm-12 col-md-6">
            <div className="inner">
              <img
                className="img-illus"
                src="/assets/img/intro_func_4.png"
                alt="illustration"
              />
              <h3>Dễ dàng quản lý nhiều lớp học, nhiều học sinh</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
