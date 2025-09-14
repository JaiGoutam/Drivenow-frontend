// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;


// import useAuth from "../hooks/useAuth";

// const { user, login, logout, loading } = useAuth();
