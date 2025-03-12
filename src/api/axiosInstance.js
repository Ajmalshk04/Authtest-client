// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.REACT_APP_API_URL,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Response interceptor for token refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await axiosInstance.post('/api/auth/refresh');
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error.response?.data?.message || 'Something went wrong');
//   }
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setCsrfToken = (csrfToken) => {
  if (csrfToken) {
    axiosInstance.defaults.headers.common["X-CSRF-Token"] = csrfToken;
  } else {
    delete axiosInstance.defaults.headers.common["X-CSRF-Token"];
  }
};

export default axiosInstance;
