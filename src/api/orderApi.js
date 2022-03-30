import axiosClient from "./axiosClient";

const orderApi = {
  getAll: () => {
    const url = "/order";
    return axiosClient.get(url);
  },

  countAllOrderMonthly: (date) => {
    const url = `/getorderbymonth?date=${date}`;
    return axiosClient.get(url);
  },

  countOrderDailyMonthly: (date) => {
    const url = `/getorderdaily?date=${date}`;
    return axiosClient.get(url);
  },

  countOrderComplete: () => {
    const url = "/countallordercomplete";
    return axiosClient.get(url);
  },

  totalDeposit: (date) => {
    const url = `/deposit?date=${date}`;
    return axiosClient.get(url);
  },
  getOne: (orderId) => {
    const url = `/order/${orderId}`;
    return axiosClient.get(url);
  },
  getOrderStatus: (date) => {
    const url= `/getorderstatus?date=${date}`;
    return axiosClient.get(url);
  },
  getProducts: (orderId) => {
    const url = `/order/${orderId}/products`;
    return axiosClient.get(url);
  },
  updateStatus: (orderId, data) => {
    const url = `/order/${orderId}/update_status`;
    return axiosClient.put(url, data);
  },
  cancleStatus: (orderId) => {
    const url = `order/cancle-status/${orderId}`;
    return axiosClient.put(url);
  },
};
export default orderApi;
