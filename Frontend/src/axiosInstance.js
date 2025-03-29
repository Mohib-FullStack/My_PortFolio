// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://my-portfolio-pmve.onrender.com/api';


// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // ✅ Required for sending cookies


//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add response interceptor for token refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // ✅ Request a new access token using the refresh token
//         await axios.post(`${API_BASE_URL}/token/refresh/`, {}, { withCredentials: true });

//         // ✅ Retry the original request
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // ✅ Handle refresh token failure (logout user)
//         console.error('Session expired. Please log in again.');
//         window.location.href = '/login'; // Optional: Use a global logout action instead
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://my-portfolio-pmve.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  transformRequest: [
    (data, headers) => {
      if (data && headers['Content-Type'] === 'application/json') {
        return JSON.stringify(data);
      }
      return data;
    }
  ]
});

export default axiosInstance;