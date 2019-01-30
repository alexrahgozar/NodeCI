import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className={input.name}>
      <label style={{ fontSize: "15px", color: "black" }}>{label}</label>
      <input
        {...input}
        style={{
          marginBottom: "5px",
          fontSize: "20px",
          fontFamily: "Helvetica"
        }}
      />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
