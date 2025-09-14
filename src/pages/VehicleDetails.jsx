// src/pages/VehicleDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/vehicles/${id}/`);
        setVehicle(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (!vehicle) return <p className="text-center mt-20 text-red-500">Vehicle not found!</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      {/* Animated placeholder for vehicle */}
      <div className="w-40 h-40 bg-blue-400 rounded-full animate-bounce mb-6"></div>

      <h2 className="text-3xl font-bold mb-4">{vehicle.name}</h2>
      <p className="text-gray-600 mb-2">Type: {vehicle.type}</p>
      <p className="text-gray-600 mb-2">Price: ${vehicle.price}</p>
      <p className="text-gray-600 mb-6">{vehicle.description}</p>

      <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
        Book Now
      </button>
    </div>
  );
};

export default VehicleDetails;
