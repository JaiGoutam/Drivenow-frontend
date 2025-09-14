// src/components/CustomCursor.jsx
import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
      className="pointer-events-none fixed w-6 h-6 rounded-full bg-blue-500 mix-blend-difference transition-transform duration-150 ease-out"
    ></div>
  );
};

export default CustomCursor;
