import axiosClient from "./axiosClient";

class SupportApi {
  getAll = () => {
    const url = "/support/all";
    return axiosClient.get(url);
  };
}
const supportApi = new SupportApi();
export default supportApi;
