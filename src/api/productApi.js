import axiosClient from "./axiosClient";

class ProductApi {
  getAll = (params) => {
    const url = `/fabric/product?warehouseId=${params}`;
    return axiosClient.get(url);
  };
  getOne = (id) => {
    const url = `/fabric/product/${id}`;
    return axiosClient.get(url);
  };
  getListById = (data) => {
    const url = "/fabric/roll";
    return axiosClient.get(url, data);
  };
  getListOfBill = (data) => {
    const url = "/fabric/rollOfBill";
    return axiosClient.post(url, data);
  };
  getChartWarehouseTrue = (params) => {
    const url = "/fabric/chartwarehouse";
    return axiosClient.get(url, { params });
  };
  getFullListType = (params) => {
    const url = "/fabric/fullTypeList";
    return axiosClient.get(url, { params });
  };
  getListColorcode = (params) => {
    const url = "/fabric/colorCode";
    return axiosClient.get(url, { params });
  };
}
const productApi = new ProductApi();
export default productApi;
