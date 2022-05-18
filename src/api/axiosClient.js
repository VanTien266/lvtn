import axios from "axios";
import qs from "qs";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
  // baseURL: Platform.OS === 'android' ? process.env.REACT_APP_API_URL_ANDROID : process.env.REACT_APP_API_IOS,
  baseURL:
    // Platform.OS === "android"
    //   ? "https://server-dclv.herokuapp.com/api/"
    //   : "https://server-dclv.herokuapp.com/api/",
    "https://lvtn-server.trongnghia.xyz/api/",
  // "http://192.168.1.64:5000/api",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = { "x-access-token": null };
  const accessToken = await AsyncStorage.getItem("access_token");
  if (accessToken) {
    customHeaders["x-access-token"] = accessToken;
  }
  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
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
