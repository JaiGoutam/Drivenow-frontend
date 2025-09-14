// src/components/DynamicBackground.jsx
import React from "react";

const DynamicBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
      <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl animate-spin-slow opacity-40 top-20 left-10"></div>
      <div className="absolute w-60 h-60 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full blur-3xl animate-spin-reverse opacity-30 bottom-10 right-20"></div>
    </div>
  );
};

export default DynamicBackground;
