import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser } from "../services/api";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, check if access token exists
  useEffect(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    if (access && refresh) {
      // Optionally, decode JWT to get user info
      setUser({ access, refresh });
    }
    setLoading(false);
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      const { data } = await registerUser(userData);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setUser({ access: data.access, refresh: data.refresh });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response.data };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const { data } = await loginUser(credentials);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setUser({ access: data.access, refresh: data.refresh });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response.data };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
