import axios from "axios";
import { API_BASE } from "../../utils/config";

const login = ({ email, password }) =>
  axios.post(
    `${API_BASE}user/signin`,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
const register = ({ name, email, password }) =>
  axios.post(
    `${API_BASE}user/signup`,
    { name, email, password },
    { headers: { "Content-Type": "application/json" } }
  );

export { login, register };
