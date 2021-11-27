import axios from "axios";
import { userInfo } from "../../utils/auth";
import { API_BASE } from "../../utils/config";

const axiosAdminPost = (uri, data) =>
  axios.post(uri, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo().token}`,
    },
  });
const axiosGet = (uri) => axios.get(uri);

export const createCategory = (name) =>
  axiosAdminPost(`${API_BASE}category`, { name });

export const createProduct = (data) =>
  axiosAdminPost(`${API_BASE}category`, data);

export const getCategories = () => axiosGet(`${API_BASE}category`);
