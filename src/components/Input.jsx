// src/components/Input.jsx
import React from "react";

const Input = ({ label, type = "text", value, onChange, placeholder, ...rest }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        {...rest}
      />
    </div>
  );
};

export default Input;
