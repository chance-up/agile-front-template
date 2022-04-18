import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://reqres.in/api',
  headers: { Accept: 'application/json' },
  withCredentials: false,
});
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error.response)
);
export default axios;
