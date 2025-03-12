import axios from 'axios';

const apiUrl = import.meta.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const setCsrfToken = (token) => {
  axiosInstance.defaults.headers.common['x-csrf-token'] = token;
};

export default axiosInstance;