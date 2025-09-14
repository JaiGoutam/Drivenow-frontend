import React, { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      style={{
        left: position.x - 10,
        top: position.y - 10,
      }}
      className="fixed pointer-events-none w-5 h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mix-blend-screen shadow-lg transition-transform duration-100 ease-out"
    ></div>
  );
};

export default Cursor;
