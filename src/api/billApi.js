import axiosClient from "./axiosClient";

class BillApi {
  getAll = () => {
    const url = "/bill";
    return axiosClient.get(url);
  };
  getOne = (params) => {
    const url = `/bill/detail/${params}`;
    return axiosClient.get(url);
  };
  getFabricRollByBillId = (params) => {
    const url = "/bill/list";
    return axiosClient.get(url, { params });
  };
  getListByIds = (data) => {
    const url = "/bill/list";
    return axiosClient.post(url, data);
  };
  getBillCompleted = (date) => {
    const url = `/bill/completed?date=${date}`;
    return axiosClient.get(url);
  };
  getFabricRollBillCompleted = (date) => {
    const url = `/bill/fabricrollcompleted?date=${date}`;
    return axiosClient.get(url);
  };
  getBillStatus = (date) => {
    const url = `/bill/status?date=${date}`;
    return axiosClient.get(url);
  };
  createBill = (data) => {
    const url = "/bill/create";
    return axiosClient.post(url, data);
  };
  getBillFabricTypeSell = (date) => {
    const url = `/bill/fabrictypesell?date=${date}`;
    return axiosClient.get(url);
  };
 }
const billApi = new BillApi();
export default billApi;
