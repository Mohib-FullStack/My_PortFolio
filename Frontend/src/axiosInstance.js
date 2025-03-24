import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://my-portfolio-pmve.onrender.com/api';

// Enhanced cookie handling
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken');
  if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Enhanced response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // CSRF token handling
    if (error.response?.status === 403 && 
        (error.response.data?.detail === 'CSRF Failed: CSRF token missing or incorrect.' || 
         /CSRF/i.test(error.response.data?.detail))) {
      try {
        await axios.get(`${API_BASE_URL}/csrf-token/`, { withCredentials: true });
        return axiosInstance(originalRequest);
      } catch (csrfError) {
        console.error('CSRF token refresh failed:', csrfError);
        return Promise.reject(csrfError);
      }
    }

    // Handle 502 Bad Gateway errors
    if (error.response?.status === 502) {
      console.error('Server unavailable (502). Please try again later.');
      return Promise.reject(new Error('Server is currently unavailable. Please try again later.'));
    }

    // Handle other errors
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

