import axios from 'axios';
import { useSelector } from 'react-redux';

// Custom hook to configure axios with auth headers
const useAxiosWithAuth = () => {
  const apiKey = useSelector((state) => state.user.apiKey);

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (apiKey) {
        config.headers.Authorization = `Bearer ${apiKey}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance;
};

export default useAxiosWithAuth;
