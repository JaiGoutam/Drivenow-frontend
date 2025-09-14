// src/components/Button.jsx
import React from "react";

const Button = ({ children, onClick, type = "button", className = "", ...rest }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
