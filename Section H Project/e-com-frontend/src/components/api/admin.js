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
const axiosPost = (uri, data, contentType = "application/json") =>
  axios.post(uri, data, {
    headers: {
      "Content-Type": contentType,
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
/*
 {
  "order": "desc",
  "sortBy": "price",
  "limit": 6,
  "skip": 0,
  "filter":{
    "range":{
      "price":[10,1000]
    },
    "in":{
      "category":["category-object-id"]
    }
  }
}
*/

export const getFilteredProducts = ({ sortBy, order, limit, skip, filter }) =>
  axiosPost(`${API_BASE}product/filter`, {
    sortBy,
    order,
    limit,
    skip,
    filter,
  });

export const createCart = ({ product, price }) =>
  axiosAdminPost(`${API_BASE}cart`, { user: userInfo()._id, product, price });
