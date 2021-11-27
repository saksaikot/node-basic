import axios from "axios";
import { userInfo } from "../../utils/auth";
import { API_BASE } from "../../utils/config";

const axiosAdminPost = (uri, data, contentType = "application/json") =>
  axios.post(uri, data, {
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${userInfo().token}`,
    },
  });
const axiosGet = (uri) => axios.get(uri);

export const createCategory = (name) =>
  axiosAdminPost(`${API_BASE}category`, { name });

export const createProduct = (data) =>
  axiosAdminPost(`${API_BASE}product`, data);

export const getCategories = () => axiosGet(`${API_BASE}category`);
export const getProducts = ({ sortBy, order, limit }) =>
  axiosGet(`${API_BASE}product?sortBy=${sortBy}&order=${order}&limit=${limit}`);
export const getProduct = (id) => axiosGet(`${API_BASE}product/${id}`);
