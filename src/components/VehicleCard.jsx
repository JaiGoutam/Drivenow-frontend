// src/components/VehicleCard.jsx
import React from "react";

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Optional SVG or image */}
      <div className="w-full h-32 flex items-center justify-center mb-4">
        {vehicle.icon ? (
          <img src={vehicle.icon} alt={vehicle.name} className="h-20" />
        ) : (
          <div className="text-gray-400 text-2xl">{vehicle.type}</div>
        )}
      </div>

      <h3 className="text-lg font-semibold">{vehicle.name}</h3>
      <p className="text-gray-500">{vehicle.description}</p>
      <p className="text-green-600 font-bold mt-2">${vehicle.price}</p>

      <button className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
        Book Now
      </button>
    </div>
  );
};

export default VehicleCard;
