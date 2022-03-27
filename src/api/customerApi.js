import axiosClient from "./axiosClient";

const customerApi = {
  login: (data) => {
    const url = "/customer/login";
    return axiosClient.post(url, data);
  },
  getAll: (params) => {
    const url = "/admin/liststaff";
    return axiosClient.get(url, { params });
  },
  getInfoById: (params) => {
    const url = "/admin/liststaff/info/:id";
    return axiosClient.get(url, { params });
  },
};
// const staffApi = new StaffApi();
export default customerApi;
