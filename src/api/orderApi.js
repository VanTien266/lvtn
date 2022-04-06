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

  totalDeposit: (date) => {
    const url = `/deposit?date=${date}`;
    return axiosClient.get(url);
  },
  getOne: (orderId) => {
    const url = `/order/${orderId}`;
    return axiosClient.get(url);
  },
  getOrderStatus: (date) => {
    const url = `/getorderstatus?date=${date}`;
    return axiosClient.get(url);
  },
  getOrderByDateRange: (from_date, to_date) => {
    const url = `/getorderbydaterange?from_date=${from_date}&to_date=${to_date}`;
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
    const url = `/order/cancle-status/${orderId}`;
    return axiosClient.put(url);
  },
  create: (data) => {
    const url = "/order/create";
    return axiosClient.post(url, data);
  },
  getOrderIdByCustomer: (id) => {
    const url = `/order/customer/${id}`;
    return axiosClient.get(url);
  },
};
export default orderApi;
