import axiosClient from "./axiosClient";

const staffApi = {
  login: (data) => {
    const url = "/staff/login";
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
  getSalesman: () => {
    const url = "/staff/salesman";
    return axiosClient.get(url);
  },
};
// const staffApi = new StaffApi();
export default staffApi;
