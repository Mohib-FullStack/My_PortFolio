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



// utils/axiosInstance.js
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://my-portfolio-pmve.onrender.com/api';

// 🌈 Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Your Django backend base URL
  withCredentials: true, // Required for CSRF token handling
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 🛡️ Request interceptor for CSRF token handling
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip CSRF for GET requests or when token is already set
    if (config.method === 'get' || config.headers['X-CSRFToken']) {
      return config;
    }

    try {
      // Fetch CSRF token if not available
      const csrfResponse = await axios.get(
        'https://my-portfolio-pmve.onrender.com/api/csrf-token/',
        { withCredentials: true }
      );
      
      if (csrfResponse.data.success && csrfResponse.data.csrf_token) {
        config.headers['X-CSRFToken'] = csrfResponse.data.csrf_token;
      }
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🚨 Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Something went wrong';
    
    // Enhanced error handling
    if (error.response?.status === 401) {
      console.error('Authentication required');
      // You might want to redirect to login here
    } else if (error.response?.status === 403) {
      console.error('Forbidden - Check permissions');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    }

    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
