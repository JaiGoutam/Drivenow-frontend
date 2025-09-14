// import axios from "axios";

// // ------------------
// // Base URL
// // ------------------
// const BASE_URL = "http://localhost:8000/api"; // replace with your backend URL

// // ------------------
// // Axios instance
// // ------------------
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ------------------
// // Request interceptor to attach access token
// // ------------------
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) config.headers["Authorization"] = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ------------------
// // Response interceptor for automatic refresh
// // ------------------
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         try {
//           const { data } = await axios.post(`${BASE_URL}/token/refresh/`, {
//             refresh: refreshToken,
//           });
//           localStorage.setItem("accessToken", data.access);
//           originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
//           return api(originalRequest);
//         } catch (err) {
//           console.error("Refresh token expired or invalid", err);
//           localStorage.removeItem("accessToken");
//           localStorage.removeItem("refreshToken");
//           window.location.href = "/login"; // redirect to login
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // ------------------
// // API calls
// // ------------------
// export const registerUser = (payload) => api.post("/register/", payload);
// export const loginUser = (payload) => api.post("/login/", payload);
// export const logoutUser = () => api.post("/logout/");
// export const getProfile = () => api.get("/profile/");

// // Export the axios instance if needed elsewhere
// export default api;

import axios from "axios";

// Base URL for your backend
const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with your actual backend URL
});

// Request interceptor to attach access token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle refresh token automatically
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${API.defaults.baseURL}/auth/refresh/`,
            { refresh: refreshToken }
          );

          localStorage.setItem("access_token", data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return API(originalRequest);
        } catch (err) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login"; // redirect to login if refresh fails
        }
      }
    }

    return Promise.reject(error);
  }
);

// Export API methods for auth
export const registerUser = (userData) => API.post("/auth/register/", userData);
export const loginUser = (credentials) => API.post("/auth/login/", credentials);
export const logoutUser = () => API.post("/auth/logout/");
export const verifyToken = (token) =>
  API.post("/auth/verify/", { token });

export default API;
