import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

const Profile = () => {
  const { user, logout, refreshAccessToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        // Try to refresh token if user is not available
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          navigate("/login");
        }
      }
      setLoading(false);
    };
    checkUser();
  }, [user, navigate, refreshAccessToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-xl">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>
        <p className="text-gray-700 mb-6">
          Your account is active and tokens are securely stored.
        </p>
        <Button
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
