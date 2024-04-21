import axios from 'axios';

const axiosInterceptorInstance = axios.create({
  baseURL: 'https://your-api-base-url.com/', // Replace with your API base URL
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (req) => {

    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      req.headers["Authorization"] = `${accessToken}`;
    }
    return req;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      response.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return response;
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;