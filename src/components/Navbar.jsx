// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { clearTokens } from "../services/api";

const Navbar = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);

  const handleLogout = () => {
    clearTokens(); // Remove tokens from storage
    setAuthUser({ email: null, isAuthenticated: false }); // Reset context
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">
        DriveConnect
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-green-400 transition-colors">
          Home
        </Link>
        <Link to="/vehicles" className="hover:text-green-400 transition-colors">
          Vehicles
        </Link>

        {authUser.isAuthenticated ? (
          <>
            <Link to="/profile" className="hover:text-green-400 transition-colors">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-400 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
