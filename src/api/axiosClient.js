import axios from "axios";
import qs from "qs";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
  baseURL: "https://lvtn-server.trongnghia.xyz/api/",
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
