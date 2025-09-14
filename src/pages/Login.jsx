// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // for navigation to Register page

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // hook to navigate

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login submitted", { email, password });
//     // TODO: call login API and store token
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
//       <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
//         {/* Branding */}
//         <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Drive Now</h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Forgot Password */}
//         <div className="text-right mt-2">
//           <button
//             type="button"
//             className="text-sm text-blue-500 hover:underline"
//             onClick={() => alert("Forgot password API not implemented yet")}
//           >
//             Forgot Password?
//           </button>
//         </div>

//         {/* Register Button */}
//         <div className="mt-6 text-center">
//           <span className="text-gray-600 mr-2">Don't have an account?</span>
//           <button
//             type="button"
//             className="text-blue-600 font-semibold hover:underline"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/index.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/"); // Redirect to home after login
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-blue-50 to-purple-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Branding */}
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
          Drive Now
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition transform"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-5 text-sm">
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
          <button className="text-blue-500 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
