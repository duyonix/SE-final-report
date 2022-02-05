import React from "react";
import { useLocation, useParams } from "react-router-dom";
import OperationStream from "../../components/OperationStream";
// import ListPost from "../../components/ListPost";

function Stream() {
  const { classroomId } = useParams();
  const { role, classInfo } = useLocation();
  localStorage.setItem("classroomId", classroomId);
  if (role) localStorage.setItem("role", role);
  if (classInfo) localStorage.setItem("classInfo", JSON.stringify(classInfo));

  return (
    <div className="container">
      <OperationStream />
      {/* <ListPost/>  */}
    </div>
  );
}

export default Stream;
