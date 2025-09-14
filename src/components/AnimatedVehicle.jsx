// src/components/AnimatedVehicle.jsx
import React, { useEffect, useState } from "react";

const getRandomPosition = () => {
  const top = Math.random() * 80; // percentage
  const left = Math.random() * 90; // percentage
  const speed = 5 + Math.random() * 10; // movement speed
  return { top, left, speed };
};

const AnimatedVehicle = ({ icon = "🚗" }) => {
  const [position, setPosition] = useState(getRandomPosition());

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(getRandomPosition());
    }, position.speed * 1000); // speed controls the interval

    return () => clearInterval(interval);
  }, [position.speed]);

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.top}%`,
        left: `${position.left}%`,
        transition: `top ${position.speed}s linear, left ${position.speed}s linear`,
        fontSize: "2rem",
      }}
    >
      {icon}
    </div>
  );
};

export default AnimatedVehicle;
