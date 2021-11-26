import { Navigate } from "react-router-dom";
import { isAuthenticate } from "../utils/auth";

export default function RequireAuth({ children }) {
  return isAuthenticate() ? children : <Navigate to="/login" />;
}
