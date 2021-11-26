import { Navigate } from "react-router-dom";
import { userInfo } from "../utils/auth";

export default function RequireAdmin({ children }) {
  return userInfo().role === "admin" ? children : <Navigate to="/" />;
}
