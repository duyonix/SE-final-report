import React from "react";
import CardMember from "./CardMember";

export default function AboutUs() {
  const members = [
    {
      name: "Võ Hoàng Vũ",
      role: "Technical Architecture",
      id: "19120727",
      des: "Sinh viên năm 3",
      dept: "công nghệ thông tin",
      img: "hoang_vu.jpg",
    },
    {
      name: "Đặng Thái Duy",
      role: "Technical Architecture",
      id: "19120491",
      des: "Sinh viên năm 3",
      dept: "công nghệ thông tin",
      img: "thai_duy.jpg",
    },
    {
      name: "Đàm Thị Xuân Ý",
      role: "Technical Architecture",
      id: "19120160",
      des: "Sinh viên năm 3",
      dept: "công nghệ thông tin",
      img: "xuan_y.jpg",
    },
    {
      name: "Nguyễn Thị Hiền Vi",
      role: "Technical Architecture",
      id: "19120156",
      des: "Sinh viên năm 3",
      dept: "công nghệ thông tin",
      img: "hien_vi.jpg",
    },
    {
      name: "Đinh Minh Bảo",
      role: "Technical Architecture",
      id: "19120173",
      des: "Sinh viên năm 3",
      dept: "công nghệ thông tin",
      img: "minh_bao.jpg",
    },
  ];
  const renderInfoMember = (arr) => {
    return arr?.map((item, index) => {
      return <CardMember key={index + 10} student={item} />;
    });
  };
  return (
    <section id="about-us" className="about-us container">
      <div className="about-title">
        <h1>
          Nhóm <span className="group-name">HiFive</span>
        </h1>
        <p>Năm thành lập: 2021</p>
        <p>Môn học: Nhập môn công nghệ phần mềm</p>
      </div>
      <div className="about-member">{renderInfoMember(members)}</div>
      <div className="about-thank">
        Cảm ơn bạn đã sử dụng SẢN PHẨM của chúng mình!
      </div>
    </section>
  );
}
