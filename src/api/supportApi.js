import axiosClient from "./axiosClient";

class SupportApi {
  getAll = () => {
    const url = "/support";
    return axiosClient.get(url);
  };
  response = (data) => {
    const url = "/support/response";
    return axiosClient.put(url, data);
  };
  create = (data) => {
    const url = "/support/create";
    return axiosClient.post(url, data);
  };
}
const supportApi = new SupportApi();
export default supportApi;
