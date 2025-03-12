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

import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL; // Use Vite's import.meta.env

// function isValidUrl(string) {
//   try {
//     new URL(string);
//     return true;
//   } catch (_) {
//     return false;
//   }
// }

// if (!apiUrl || !isValidUrl(apiUrl)) {
//   console.error(`VITE_API_URL is invalid or not set. Got: "${apiUrl}". Please set it in your environment variables.`);
//   throw new Error(`VITE_API_URL must be a valid URL. Got: ${apiUrl}`);
// }

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const setCsrfToken = (token) => {
  axiosInstance.defaults.headers.common['x-csrf-token'] = token;
};

export default axiosInstance;