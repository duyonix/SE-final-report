import React from "react";
import ListMember from "../../components/ListMember";
import OperationMember from "../../components/OperationMember";

function Member() {
  return (
    <div className="member">
      <OperationMember />
      <ListMember />
    </div>
  );
}

export default Member;
