import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "40px",
        width: "200px",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      404! Page Not Found
    </div>
  );
};

export default NotFound;
