import React from "react";
import HomeworkInfo from "../../components/HomeworkInfo";
import ListSubmission from "../../components/ListSubmission";

function HomeworkDetail() {
  return (
    <div className="homework-detail container">
      <HomeworkInfo />
      <ListSubmission />
    </div>
  );
}

export default HomeworkDetail;
