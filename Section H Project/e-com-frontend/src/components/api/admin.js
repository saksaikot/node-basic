import axios from "axios";
import { userInfo } from "../../utils/auth";
import { API_BASE } from "../../utils/config";

export const createCategory = (name) => {
  return axios.post(
    `${API_BASE}category`,
    { name },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo().token}`,
      },
    }
  );
};
