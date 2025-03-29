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
  baseURL: API_BASE_URL,
  withCredentials: true, // Required for CSRF token and session handling
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// 🔄 Maximum retries for CSRF token fetch
const MAX_CSRF_RETRIES = 2;
let csrfRetryCount = 0;

// 🛡️ Enhanced Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip CSRF for safe methods or when token exists
    if (['GET', 'HEAD', 'OPTIONS'].includes(config.method?.toUpperCase()) || 
        config.headers['X-CSRFToken']) {
      return config;
    }

    try {
      // Fetch CSRF token with retry logic
      const csrfResponse = await axios.get(`${API_BASE_URL}/csrf-token/`, {
        withCredentials: true,
      });

      if (csrfResponse.data?.success && csrfResponse.data?.csrf_token) {
        config.headers['X-CSRFToken'] = csrfResponse.data.csrf_token;
        csrfRetryCount = 0; // Reset retry counter on success
      }
    } catch (error) {
      console.error('CSRF token fetch error:', error);
      if (csrfRetryCount < MAX_CSRF_RETRIES) {
        csrfRetryCount++;
        return axiosInstance(config); // Retry the request
      }
      throw new Error('Failed to get CSRF token after multiple attempts');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🚨 Enhanced Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can transform successful responses here if needed
    return response;
  },
  (error) => {
    // Handle network errors (no response)
    if (!error.response) {
      const networkError = {
        status: 0,
        message: 'Network Error - Please check your internet connection',
        originalError: error,
      };
      return Promise.reject(networkError);
    }

    // Handle server errors (500, etc.)
    const statusCode = error.response.status;
    const serverError = {
      status: statusCode,
      message: error.response.data?.message ||
               error.response.data?.detail ||
               error.message ||
               `Server returned ${statusCode} status`,
      data: error.response.data,
      headers: error.response.headers,
    };

    // Specific status code handling
    switch (statusCode) {
      case 401:
        // Handle unauthorized (redirect to login, etc.)
        break;
      case 403:
        // Handle forbidden
        break;
      case 404:
        // Handle not found
        break;
      case 500:
        console.error('Server Error:', {
          url: error.config.url,
          data: error.config.data,
          response: error.response.data,
        });
        break;
    }

    return Promise.reject(serverError);
  }
);

export default axiosInstance;
