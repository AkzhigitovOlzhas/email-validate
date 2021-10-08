import React from "react";

export const Hint = ({ value, hadleClick }) => {
  return (
    <div
      className="text-warning fw-bold"
      style={{ cursor: "pointer" }}
      onClick={hadleClick}
    >
      {value}
    </div>
  );
};
