import axiosClient from "./axiosClient";

class StaffApi {
  login = (data) => {
    const url = "/user/staff/login";
    return axiosClient.post(url, data);
  };
  getAll = (params) => {
    const url = "/user/admin/liststaff";
    return axiosClient.get(url, { params });
  };
  getInfoById = (params) => {
    const url = "/user/admin/staffInfo/:id";
    return axiosClient.get(url, { params });
  };
  getSalesman = () => {
    const url = "/user/staff/salesman";
    return axiosClient.get(url);
  };
}
const staffApi = new StaffApi();
export default staffApi;
