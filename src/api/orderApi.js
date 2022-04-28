import axiosClient from "./axiosClient";

const orderApi = {
  getAll: (page, limit) => {
    const url = `/order?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  create: (data) => {
    const url = "/order/create";
    return axiosClient.post(url, data);
  },
  getOne: (orderId) => {
    const url = `/order/detail/${orderId}`;
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
  totalDeposit: (date) => {
    const url = `/order/deposit?date=${date}`;
    return axiosClient.get(url);
  },
  getOrderStatus: (date) => {
    const url = `/order/getorderstatus?date=${date}`;
    return axiosClient.get(url);
  },
  countAllOrderMonthly: (date) => {
    const url = `/order/getorderbymonth?date=${date}`;
    return axiosClient.get(url);
  },

  countOrderDailyMonthly: (date) => {
    const url = `/order/getorderdaily?date=${date}`;
    return axiosClient.get(url);
  },

  getOrderByDateRange: (from_date, to_date) => {
    const url = `/order/getorderbydaterange?from_date=${from_date}&to_date=${to_date}`;
    return axiosClient.get(url);
  },

  cancelStatus: (orderId) => {
    const url = `/order/${orderId}/cancelStatus`;
    console.log(url);
    return axiosClient.put(url);
  },

  getOrderIdByCustomer: (id) => {
    const url = `/order/customer/${id}`;
    return axiosClient.get(url);
  },
};
export default orderApi;
