import axiosClient from "./axiosClient";

class ProductApi {
  getAll = (params) => {
    const url = "/product1";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = "/product/detail";
    return axiosClient.get(url, { params });
  };
  getListById = (data) => {
    const url = "/product/list";
    return axiosClient.post(url, data);
  };
  getListOfBill = (data) => {
    const url = "/product/fabricroll-bill";
    return axiosClient.post(url, data);
  };
  getChartWarehouseTrue = (params) => {
    const url = "/chartwarehouse";
    return axiosClient.get(url, { params });
  };
  getFullListType = (params) => {
    const url = "/product/list-type";
    return axiosClient.get(url, { params });
  };
  getListColorcode = (params) => {
    const url = "/product/colorcode";
    return axiosClient.get(url, { params });
  };
}
const productApi = new ProductApi();
export default productApi;
