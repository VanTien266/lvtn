import axiosClient from "./axiosClient";

class CustomerApi {
  login = (data) => {
    const url = "/user/customer/login";
    return axiosClient.post(url, data);
  };
  getAll = (params) => {
    const url = "/user/admin/liststaff";
    return axiosClient.get(url, { params });
  };
  getCustomerInfo = () => {
    const url = "/user/customer/detail";
    return axiosClient.get(url);
  };
  getInfoById = (params) => {
    const url = "/user/admin/liststaff/info/:id";
    return axiosClient.get(url, { params });
  };
}
const customerApi = new CustomerApi();
export default customerApi;
