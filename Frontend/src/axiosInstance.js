import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://my-portfolio-pmve.onrender.com/api';

// Helper function to get CSRF token from cookies
function getCSRFToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return cookieValue;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor for CSRF token
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCSRFToken();
  if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle CSRF token mismatch
    if (error.response?.status === 403 && error.response.data?.detail === 'CSRF Failed: CSRF token missing or incorrect.') {
      try {
        // Get new CSRF token
        await axios.get(`${API_BASE_URL}/csrf-token/`, { withCredentials: true });
        // Retry original request
        return axiosInstance(originalRequest);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    // Handle token refresh (existing code)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${API_BASE_URL}/token/refresh/`, {}, { withCredentials: true });
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;








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

