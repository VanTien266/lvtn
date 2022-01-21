import axios from "axios";
import qs from "qs";
import {Platform} from 'react-native';

const axiosClient = axios.create({
  // baseURL: Platform.OS === 'android' ? 'http://192.168.1.8:5000/api' : 'https://192.168.1.8:5000/api',
  baseURL: Platform.OS === 'android' ? 'https://server-dclv.herokuapp.com/api/' : 'https://server-dclv.herokuapp.com/api/',
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
