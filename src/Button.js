import React from "react";

/* 
  Button Component
  @param {string} name
  @param {func} handleClick
  @returns button element
 */
const Button = ({ name, handleClick }) => {
  return (
    <input
      className="button button1"
      type="button"
      value={name}
      onClick={handleClick}
    />
  );
};

export default Button;
